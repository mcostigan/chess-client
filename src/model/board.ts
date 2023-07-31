import {PieceColor, PieceFactory, PieceType} from "./piece";
import {IServerMove} from "./move";
import {Square} from "./square";

export class Board {

  private constructor(public squares: Square[][]) {}

  resetMoves() {
    this.squares.forEach((row: Square[]) => {
        row.forEach(
          (sq: Square) => {
            sq.clearMoves()
          }
        )
      }
    )

  }

  set availableMoves(moves: IServerMove[]) {
    this.resetMoves()
    moves.forEach(
      (move: IServerMove) => {
        this.squares[move.from.first][move.from.second].addMoveFrom(move)
      }
    )
  }


  private static pieceFactory = new PieceFactory()

  static build(): Board {
    let squares: Square[][] = new Array(8)
    for (let i = 0; i < 8; i++) {
      squares[i] = new Array<Square>(8)
      for (let j = 0; j < 8; j++) {
        squares[i][j] = new Square({first: i, second: j}, null)
      }
    }

    this.pawnRow(PieceColor.WHITE, squares)
    this.pawnRow(PieceColor.BLACK, squares)
    this.homeRow(PieceColor.WHITE, squares)
    this.homeRow(PieceColor.BLACK, squares)
    return new Board(squares)
  }

  private static pawnRow(color: PieceColor, squares: Square[][]) {
    let row = ((color === PieceColor.WHITE) ? 1 : 6)
    for (let col = 0; col < 8; col++) {
      squares[row][col].piece = this.pieceFactory.get(PieceType.PAWN, color)
    }
  }

  private static homeRow(color: PieceColor, squares: Square[][]) {
    let row = ((color === PieceColor.WHITE) ? 0 : 7)
    squares[row][0].piece = this.pieceFactory.get(PieceType.ROOK, color)
    squares[row][7].piece = this.pieceFactory.get(PieceType.ROOK, color)
    squares[row][1].piece = this.pieceFactory.get(PieceType.KNIGHT, color)
    squares[row][6].piece = this.pieceFactory.get(PieceType.KNIGHT, color)
    squares[row][2].piece = this.pieceFactory.get(PieceType.BISHOP, color)
    squares[row][5].piece = this.pieceFactory.get(PieceType.BISHOP, color)
    squares[row][3].piece = this.pieceFactory.get(PieceType.QUEEN, color)
    squares[row][4].piece = this.pieceFactory.get(PieceType.KING, color)
  }
}


