import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {IServerMove, Pair} from "../../model/move";
import {Piece, PieceType, Promotable} from "../../model/piece";

@Injectable({
  providedIn: 'root'
})
export class MoveExecutionService {

  constructor() {
  }

  execute(board: Board, move: IServerMove) {
    let targetSquare = board.squares[move.to.first][move.to.second]

    if (targetSquare.piece != null) {
      targetSquare.piece!!.kill()
      board.capture(targetSquare.piece)
    }

    this.move(move.from, move.to, board)
    if (move.isCastle) {
      this.executeCaste(board, move.to)
    }

    if (move.isPromotion) {
      this.executePromotion(targetSquare.piece!!, move.promotionTarget!!)
    }
  }

  /**
   * Completes the castle move (either king-side or queen-side) by moving rook to appropriate position
   * @param board board object on which the rook will be moved
   * @param to The destination of the king, used to determine if the move is king-side or queen-side
   * @private
   */
  private executeCaste(board: Board, to: Pair<number>) {
    let rookToCol: number
    let rookFromCol: number
    // handle queen-side vs king-side castle
    if (to.second === 2) {
      rookFromCol = 0
      rookToCol = 3
    } else {
      rookFromCol = 7
      rookToCol = 5
    }
    this.move({first: to.first, second: rookFromCol}, {
      first: to.first,
      second: rookToCol
    }, board)
  }

  /**
   * Promotes an eligible piece to the target type
   * @param piece piece to be promoted
   * @param promotionTarget name of new type, as string
   * @private
   */
  private executePromotion(piece: Piece, promotionTarget: string) {
    let promotable = piece as unknown as Promotable
    let target: PieceType = PieceType[promotionTarget as keyof typeof PieceType];
    promotable.promote(target)
  }

  private move(from: Pair<number>, to: Pair<number>, board: Board) {
    board.squares[to.first][to.second].piece = board.squares[from.first][from.second].piece
    board.squares[from.first][from.second].piece = null

  }

}
