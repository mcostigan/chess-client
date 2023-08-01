import {IServerMove, Pair} from "./move";
import {Piece} from "./piece";

export class Square {
  position: Pair<number>
  piece: Piece | null
  movesTo: IServerMove[] = []


  constructor(position: Pair<number>, piece: Piece | null) {
    this.position = position;
    this.piece = piece;
  }

  clearMoves(){
    this.movesTo = []
  }

  addMoveTo(movesTo: IServerMove) {
    this.movesTo.push(movesTo)
  }
}
