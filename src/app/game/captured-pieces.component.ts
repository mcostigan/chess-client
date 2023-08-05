import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {Piece, PieceColor} from "../../model/piece";
import {PieceDrawerService} from "./gameplay/piece-drawer.service";

@Component({
  selector: 'app-captured-pieces',
  template: `
    <div class="captured-pieces">
      <span *ngFor="let piece of pieces" class="piece">
        {{pieceDrawerService.getUnicode(piece.type, piece.color)}}
      </span>
    </div>

  `,
  styles: [
    `
      .captured-pieces {
        display: flex;
        flex-direction: row;
        justify-content: left;
        column-gap: 5px;
      }

      .piece {
        font-size: xxx-large;
        text-align: center;
      }
    `
  ]
})
export class CapturedPiecesComponent implements OnInit {
  @Input() board!: Board
  @Input() color!: PieceColor

  captureColor: PieceColor | null = null
  pieces: Piece[] = []

  constructor(public pieceDrawerService: PieceDrawerService) {
  }

  ngOnInit(): void {
    this.captureColor = (this.color == PieceColor.WHITE) ? PieceColor.BLACK : PieceColor.WHITE
    this.pieces = this.board.capturedPieces(this.captureColor)
  }

}
