import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {IServerMove, Pair} from "../../model/move";
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

    this.move(move.from, move.to, board)
    if (move.isCastle) {
      this.executeCaste(board, move)
    }

    if (targetPiece != null) {
      targetPiece.kill()
    }

    if (move.isPromotion) {
      let promotable = piece as unknown as Promotable
      let target: PieceType = PieceType[move.promotionTarget!! as keyof typeof PieceType];
      promotable.promote(target)
    }
  }

  private executeCaste(board: Board, move: IServerMove) {
    let offset: number
    if (move.to.second === 2) {
      offset = +1
    } else {
      offset = -1
    }

    this.move({first: move.to.first, second: move.to.second - offset}, {
      first: move.to.first,
      second: move.to.second + offset
    }, board)
  }

  private move(from: Pair<number>, to: Pair<number>, board: Board) {
    board.squares[to.first][to.second] = board.squares[from.first][from.second]!!
    board.squares[from.first][from.second] = null

  }

}
