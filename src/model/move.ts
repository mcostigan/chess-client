export interface IClientMove {
  from: Pair<number>
  to: Pair<number>
  promotionTarget: string | null
}

export interface IServerMove extends IClientMove{
  description: string
  isAttack: boolean
  isPromotion: boolean
  isCastle: boolean
  color: string

}

export interface IMoveResult {
  move: IServerMove
  gameStatus: string
}

export interface Pair<T> {
  first: T
  second: T
}
