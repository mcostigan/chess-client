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

  id: string
  white: IPlayer
  black: IPlayer | null = null


  constructor(id: string, white: IPlayer, black: IPlayer | null) {
    this.id = id;
    this.white = white;
    this.black = black

    if (black) {
      this.state = new LiveGameState(this, this.setState.bind(this))
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
