import {Board} from "./board";
import {MoveExecutionService} from "../app/game/move-execution.service";
import {IServerMove} from "./move";

export interface IGame {
  id: string
  white: IPlayer
  black: IPlayer | null
}

export interface IPlayer {
  id: string
  name: string
}

export class Game {
  private state: GameState

  board: Board | null = null

  constructor(public id: string, public white: IPlayer, public black: IPlayer | null, private moveExecutionService: MoveExecutionService) {
    if (black) {
      this.state = new LiveGameState(this, this.setState.bind(this))
      this.board = Board.build()
    } else {
      this.state = new PendingGameState(this, this.setState.bind(this))
    }
  }

  addPlayer(player: IPlayer) {
    this.state.addPlayer(player)
  }

  private setState(state: GameState) {
    this.state = state
  }

  getState() {
    return this.state.name
  }

  move(move: IServerMove) {
    this.moveExecutionService.execute(this.board!!, move)
  }


}

abstract class GameState {
  protected constructor(protected context: Game, protected updateState: (s: GameState) => void) {
  }

  abstract name: string

  abstract addPlayer(player: IPlayer): void

}

class PendingGameState extends GameState {

  readonly name = "Pending"

  constructor(context: Game, updateState: (s: GameState) => void) {
    super(context, updateState);
  }

  addPlayer(player: IPlayer): void {
    this.context.black = player
    let newState = new LiveGameState(this.context, this.updateState)
    this.context.board = Board.build()
    this.updateState(newState)
  }
}

class LiveGameState extends GameState {


  constructor(context: Game, updateState: (s: GameState) => void) {
    super(context, updateState);
  }

  addPlayer(player: IPlayer): void {
  }

  readonly name: string = "Live"

}
