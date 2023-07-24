export interface IGame {
  id: string
  white: IPlayer | null
  black: IPlayer | null
}

export interface IPlayer {
  id: string
  name: string
}
