import {Component, Input, OnInit} from '@angular/core';
import {Piece} from "../../../model/piece";

@Component({
  selector: 'app-square',
  template: `
    <div [className]="squareColor()">
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

        .dark-square{
          background-color: gray;
        }

        .light-square{
          background-color: white;
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
  @Input() position!: [number, number]
  constructor() {
  }

  ngOnInit(): void {
  }

  squareColor(): string{
    if ((this.position[0] + this.position[1])%2 == 1){
      return "square dark-square"
    } else {
      return "square light-square"
    }
  }

}
