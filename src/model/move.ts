export interface IClientMove {
  from: Pair<number>
  to: Pair<number>
  promotionTarget: string | null
}

export interface IServerMove extends IClientMove{
  describe: string
  isAttack: boolean
  isPromotion: boolean
  isCastle: boolean

}

export interface Pair<T> {
  first: T
  second: T
}
