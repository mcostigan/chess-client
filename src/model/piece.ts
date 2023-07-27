export abstract class Piece {
  private _isAlive: boolean = true
  get isAlive(): boolean {
    return this._isAlive;
  }

  set isAlive(value: boolean) {
    this._isAlive = value;
  }

  protected constructor(readonly color: PieceColor) {
  }


  abstract type: PieceType


  kill() {
    this._isAlive = false
  }

}

export class PieceFactory {
  get(type: PieceType, color: PieceColor): Piece {
    switch (type) {
      case PieceType.BISHOP:
        return new Bishop(color)
      case PieceType.KING:
        return new King(color)
      case PieceType.KNIGHT:
        return new Knight(color)
      case PieceType.PAWN:
        return new Pawn(color)
      case PieceType.QUEEN:
        return new Queen(color)
      case PieceType.ROOK:
        return new Rook(color)
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

export interface Promotable {
  promote(target: PieceType): void
}

class Pawn extends Piece implements Promotable {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.PAWN;

  promote(promotionTarget: PieceType) {
    this.type = promotionTarget
  }
}

class Rook extends Piece {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.ROOK;
}

class Bishop extends Piece {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.BISHOP;
}

class Knight extends Piece {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.KNIGHT;
}

class Queen extends Piece {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.QUEEN;
}

class King extends Piece {

  constructor(color: PieceColor) {
    super(color);
  }

  type: PieceType = PieceType.KING;
}
