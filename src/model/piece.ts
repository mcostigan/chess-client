import {Pair} from "./move";
import {Square} from "./square";

export abstract class Piece {
  private _isAlive: boolean = true
  get isAlive(): boolean {
    return this._isAlive;
  }

  protected constructor(readonly color: PieceColor, readonly isMyPiece: boolean) {
  }


  abstract type: PieceType


  kill() {
    this._isAlive = false
  }

}

export class PieceFactory {
  get(type: PieceType, color: PieceColor, myColor: PieceColor): Piece {
    switch (type) {
      case PieceType.BISHOP:
        return new Bishop(color, color == myColor)
      case PieceType.KING:
        return new King(color, color == myColor)
      case PieceType.KNIGHT:
        return new Knight(color, color == myColor)
      case PieceType.PAWN:
        return new Pawn(color, color == myColor)
      case PieceType.QUEEN:
        return new Queen(color, color == myColor)
      case PieceType.ROOK:
        return new Rook(color, color == myColor)
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

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.PAWN;

  promote(promotionTarget: PieceType) {
    this.type = promotionTarget
  }
}

class Rook extends Piece {

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.ROOK;
}

class Bishop extends Piece {

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.BISHOP;
}

class Knight extends Piece {

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.KNIGHT;
}

class Queen extends Piece {

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.QUEEN;
}

class King extends Piece {

  constructor(color: PieceColor, isMyPiece: boolean) {
    super(color, isMyPiece);
  }

  type: PieceType = PieceType.KING;
}
