import {Board} from "./board";
import {MoveExecutionService} from "../app/game/move-execution.service";
import {IServerMove} from "./move";
import {PieceColor} from "./piece";
import {Observable, of, Subject} from "rxjs";

export interface IGame {
  id: string
  white: IPlayer
  black: IPlayer | null
}

export interface IPlayer {
  id: string
  name: string
  photo: string
}

export class Game {
  private _state!: GameState
  private stateSubject = new Subject<GameState>()
  private _turn: PieceColor = PieceColor.WHITE
  board: Board | null = null


  get turn(): PieceColor {
    return this._turn;
  }

  constructor(public id: string, public white: IPlayer, public black: IPlayer | null, public moveExecutionService: MoveExecutionService) {
    if (black) {
      this.setState(new LiveGameState(this, this.setState.bind(this), this.setTurn.bind(this)))
      this.board = Board.build()
    } else {
      this.setState(new PendingGameState(this, this.setState.bind(this), this.setTurn.bind(this)))
    }
  }

  addPlayer(player: IPlayer) {
    this._state.addPlayer(player)
  }

  private setState(state: GameState) {
    this._state = state
    this.stateSubject.next(this._state)
  }

  private setTurn(turn: PieceColor) {
    this._turn = turn
  }

  getState() {
    return this._state.name
  }

  move(move: IServerMove) {
    this._state.move(move)
  }

  set availableMoves(value: IServerMove[]) {
    this._state.availableMoves = value
  }

  get availableMoves(): IServerMove[] {
    return this._state.availableMoves;
  }

  subscribeToState(): Observable<GameState>{
    return this.stateSubject
  }


}

export abstract class GameState {
  protected constructor(protected context: Game, protected updateState: (s: GameState) => void, protected updateTurn: (t: PieceColor) => void) {
  }

  abstract name: string

  abstract addPlayer(player: IPlayer): void

  abstract move(move: IServerMove): void

  abstract get availableMoves(): IServerMove[]
  abstract set availableMoves(value: IServerMove[])

}

class PendingGameState extends GameState {

  readonly name = "Pending"

  constructor(context: Game, updateState: (s: GameState) => void, updateTurn: (t: PieceColor) => void) {
    super(context, updateState, updateTurn);
  }

  addPlayer(player: IPlayer): void {
    this.context.black = player
    let newState = new LiveGameState(this.context, this.updateState, this.updateTurn)
    this.context.board = Board.build()
    this.updateState(newState)
  }

  move(move: IServerMove): void {
  }

  get availableMoves(): IServerMove[] {
    return []
  }

  set availableMoves(value: IServerMove[]) {
  }
}

class LiveGameState extends GameState {


  constructor(context: Game, updateState: (s: GameState) => void, updateTurn: (t: PieceColor) => void) {
    super(context, updateState, updateTurn);
  }

  addPlayer(player: IPlayer): void {
  }

  readonly name: string = "Live"

  move(move: IServerMove): void {
    this.context.moveExecutionService.execute(this.context.board!!, move)
    if (move.color === 'WHITE') {
      this.updateTurn(PieceColor.BLACK)
    } else {
      this.updateTurn(PieceColor.WHITE)
    }
  }


  get availableMoves(): IServerMove[] {
    return this.context.board!!.availableMoves;
  }

  set availableMoves(value: IServerMove[]) {
    // TODO: filter move for user color
    this.context.board!!.availableMoves = value
  }

}
