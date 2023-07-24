import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../../model/piece";

@Component({
  selector: 'app-piece',
  template: `
    <div>
      {{piece.type}}
    </div>
  `,
  styles: []
})
export class PieceComponent implements OnInit {
  @Input() piece!: Piece

  constructor() {
  }

  ngOnInit(): void {
  }

}
