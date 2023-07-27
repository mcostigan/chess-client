import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {IServerMove} from "../../model/move";
import {PieceType, Promotable} from "../../model/piece";

@Injectable({
  providedIn: 'root'
})
export class MoveExecutionService {

  constructor() {
  }

  execute(board: Board, move: IServerMove) {
    let piece = board.squares[move.from.first][move.from.second]!!
    let targetPiece = board.squares[move.to.first][move.to.second]

    board.squares[move.to.first][move.to.second] = piece
    piece.position = [move.to.first, move.to.second]

    board.squares[move.from.first][move.from.second] = null
    if (targetPiece != null) {
      targetPiece.kill()
    }

    if (move.isPromotion) {
      let promotable = piece as unknown as Promotable
      let target: PieceType = PieceType[move.promotionTarget!! as keyof typeof PieceType];
      promotable.promote(target)
    }

    if (move.isCastle) {
      // TODO: castle
    }
  }
}
