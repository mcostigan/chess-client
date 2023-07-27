import {Piece, PieceColor, PieceFactory, PieceType} from "./piece";

export class Board {


  private constructor(public squares: (Piece | null)[][]) {
  }


  private static pieceFactory = new PieceFactory()

  static build(): Board {
    let squares: (Piece | null)[][] = new Array(8)
    for (let i = 0; i < 8; i++) {
      squares[i] = new Array<Piece | null>(8)
    }

    this.pawnRow(PieceColor.WHITE, squares)
    this.pawnRow(PieceColor.BLACK, squares)
    this.homeRow(PieceColor.WHITE, squares)
    this.homeRow(PieceColor.BLACK, squares)
    console.log(squares)
    return new Board(squares)
  }

  private static pawnRow(color: PieceColor, squares: (Piece | null)[][]) {
    let row = ((color === PieceColor.WHITE) ? 1 : 6)
    for (let col = 0; col < 8; col++) {
      squares[row][col] = this.pieceFactory.get(PieceType.PAWN, color)
    }
  }

  private static homeRow(color: PieceColor, squares: (Piece | null)[][]) {
    let row = ((color === PieceColor.WHITE) ? 0 : 7)
    squares[row][0] = this.pieceFactory.get(PieceType.ROOK, color)
    squares[row][7] = this.pieceFactory.get(PieceType.ROOK, color)
    squares[row][1] = this.pieceFactory.get(PieceType.KNIGHT, color)
    squares[row][6] = this.pieceFactory.get(PieceType.KNIGHT, color)
    squares[row][2] = this.pieceFactory.get(PieceType.BISHOP, color)
    squares[row][5] = this.pieceFactory.get(PieceType.BISHOP, color)
    squares[row][3] = this.pieceFactory.get(PieceType.QUEEN, color)
    squares[row][4] = this.pieceFactory.get(PieceType.KING, color)
  }
}


