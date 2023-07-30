import {IServerMove, Pair} from "./move";
import {Piece} from "./piece";

export class Square {
  position: Pair<number>
  piece: Piece | null
  movesFrom: IServerMove[] = []
  movesTo: IServerMove[] = []


  constructor(position: Pair<number>, piece: Piece | null) {
    this.position = position;
    this.piece = piece;
  }

  clearMoves(){
    this.movesFrom = []
    this.movesTo = []
  }

  addMoveFrom(movesFrom: IServerMove) {
    this.movesFrom.push(movesFrom)
  }

  addMoveTo(movesTo: IServerMove) {
    this.movesTo.push(movesTo)
  }
}
