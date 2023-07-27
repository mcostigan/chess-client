import {Injectable} from '@angular/core';
import {PieceColor, PieceType} from "../../../model/piece";

@Injectable({
  providedIn: 'root'
})
export class PieceDrawerService {

  constructor() {
  }

  private pieces: { type: PieceType, color: PieceColor, unicode: string }[] = [
    {type: PieceType.KING, color: PieceColor.WHITE, unicode: '\u2654'},
    {type: PieceType.QUEEN, color: PieceColor.WHITE, unicode: '\u2655'},
    {type: PieceType.ROOK, color: PieceColor.WHITE, unicode: '\u2656'},
    {type: PieceType.BISHOP, color: PieceColor.WHITE, unicode: '\u2657'},
    {type: PieceType.KNIGHT, color: PieceColor.WHITE, unicode: '\u2658'},
    {type: PieceType.PAWN, color: PieceColor.WHITE, unicode: '\u2659'},
    {type: PieceType.KING, color: PieceColor.BLACK, unicode: '\u265A'},
    {type: PieceType.QUEEN, color: PieceColor.BLACK, unicode: '\u265B'},
    {type: PieceType.ROOK, color: PieceColor.BLACK, unicode: '\u265C'},
    {type: PieceType.BISHOP, color: PieceColor.BLACK, unicode: '\u265D'},
    {type: PieceType.KNIGHT, color: PieceColor.BLACK, unicode: '\u265E'},
    {type: PieceType.PAWN, color: PieceColor.BLACK, unicode: '\u265F'},
  ];

  getUnicode(pieceType: PieceType, pieceColor: PieceColor): string  {
    return this.pieces.find(
      (piece) => piece.type === pieceType && piece.color === pieceColor
    )!!.unicode;
  }
}
