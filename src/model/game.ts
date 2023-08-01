import {Board} from "./board";
import {MoveExecutionService} from "../app/game/move-execution.service";
import {IMoveResult, IServerMove} from "./move";
import {PieceColor} from "./piece";
import {Observable, Subject} from "rxjs";

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

  move(move: IMoveResult) {
    this._state.move(move)
  }

  subscribeToState(): Observable<GameState> {
    return this.stateSubject
  }


}

export abstract class GameState {
  protected constructor(protected context: Game, protected updateState: (s: GameState) => void, protected updateTurn: (t: PieceColor) => void) {
  }

  abstract name: string

  abstract addPlayer(player: IPlayer): void

  abstract move(move: IMoveResult): void

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

  move(move: IMoveResult): void {
  }
}

class LiveGameState extends GameState {


  constructor(context: Game, updateState: (s: GameState) => void, updateTurn: (t: PieceColor) => void) {
    super(context, updateState, updateTurn);
  }

  addPlayer(player: IPlayer): void {
  }

  readonly name: string = "Live"

  move(moveResult: IMoveResult): void {
    let move = moveResult.move
    this.context.moveExecutionService.execute(this.context.board!!, move)
    if (move.color === 'WHITE') {
      this.updateTurn(PieceColor.BLACK)
    } else {
      this.updateTurn(PieceColor.WHITE)
    }

    if (moveResult.gameStatus == "CHECKMATE"){
      this.updateState(new CompleteGameState(this.context, this.updateState, this.updateTurn))
    }
  }

}

class CompleteGameState extends GameState {


  constructor(context: Game, updateState: (s: GameState) => void, updateTurn: (t: PieceColor) => void) {
    super(context, updateState, updateTurn);
  }

  addPlayer(player: IPlayer): void {
  }

  readonly name: string = "Complete"

  move(move: IMoveResult): void {
  }
}
