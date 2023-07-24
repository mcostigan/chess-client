export abstract class Piece {
  protected constructor(public position: [number, number], readonly color: PieceColor) {
  }

  abstract type: PieceType

  move(position: [number, number]) {
    this.position = position
  }

}

export class PieceFactory {
  get(type: PieceType, position: [number, number], color: PieceColor): Piece {
    switch (type) {
      case PieceType.BISHOP:
        return new Bishop(position, color)
      case PieceType.KING:
        return new King(position, color)
      case PieceType.KNIGHT:
        return new Knight(position, color)
      case PieceType.PAWN:
        return new Pawn(position, color)
      case PieceType.QUEEN:
        return new Queen(position, color)
      case PieceType.ROOK:
        return new Rook(position, color)
    }
  }
}

export enum PieceColor {
  WHITE,
  BLACK
}

export enum PieceType {
  PAWN,
  ROOK,
  BISHOP,
  KNIGHT,
  QUEEN,
  KING
}

class Pawn extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.PAWN;
}

class Rook extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.ROOK;
}

class Bishop extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.BISHOP;
}

class Knight extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.KNIGHT;
}

class Queen extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.QUEEN;
}

class King extends Piece {

  constructor(position: [number, number], color: PieceColor) {
    super(position, color);
  }

  type: PieceType = PieceType.KING;
}
