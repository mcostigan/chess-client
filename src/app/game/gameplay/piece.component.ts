import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../../model/piece";
import {PieceDrawerService} from "./piece-drawer.service";

@Component({
  selector: 'app-piece',
  template: `
    <div [className]="classes">
      {{this.unicode}}
    </div>
  `,
  styles: [
    `
      .piece {
        font-size: xxx-large;
        text-align: center;
        height: 100%;
        width: 100%;
      }
      .my-piece {
        cursor: pointer;
      }

      .my-piece:hover{
        border: 3px solid black;
        box-sizing: border-box;
      }
    `
  ]
})
export class PieceComponent implements OnInit {
  _piece!: Piece;
  get piece(): Piece {
    return this._piece;
  }

  @Input() set piece(value: Piece) {
    this._piece = value;
    this.setUnicode();
  }

  unicode: string = ''

  constructor(private pieceDrawer: PieceDrawerService) {
  }

  ngOnInit(): void {
    this.setUnicode()
  }

  setUnicode() {
    this.unicode = this.pieceDrawer.getUnicode(this.piece.type, this.piece.color)
  }

  get classes(){
    return 'piece' + ((this.piece.isMyPiece) ? ' my-piece' : '')
  }

}
