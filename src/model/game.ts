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
  id: string
  white: IPlayer
  black: IPlayer | null = null


  constructor(id: string, white: IPlayer, black: IPlayer | null) {
    this.id = id;
    this.white = white;
    this.black = black
  }

  addPlayer(player: IPlayer) {
    this.black = player
  }


}
