import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../../model/piece";

@Component({
  selector: 'app-square',
  template: `
    <div class="square">
      <div class="square-contents" *ngIf="piece">
        <app-piece [piece]="piece"></app-piece>
      </div>
      <div class="square-contents" *ngIf="!piece">

      </div>

    </div>
  `,
  styles: [
    `
        .square {
          border: 1px solid black;
          width: 40px;
          height: 40px;
        }

        .square-contents {
          width: 100%;
          height: 100%;
        }
    `
  ]
})
export class SquareComponent implements OnInit {
  @Input() piece: Piece | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

}
