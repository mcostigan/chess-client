import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../../model/piece";
import {PieceDrawerService} from "./piece-drawer.service";

@Component({
  selector: 'app-piece',
  template: `
    <div class="piece">
      {{this.unicode}}
    </div>
  `,
  styles: [
    `
      .piece {
        font-size: xxx-large;
        horiz-align: center;
      }
    `
  ]
})
export class PieceComponent implements OnInit {
  @Input() piece!: Piece
  unicode: string = ''

  constructor(private pieceDrawer: PieceDrawerService) {}

  ngOnInit(): void {
    this.unicode = this.pieceDrawer.getUnicode(this.piece.type, this.piece.color)
  }

}
