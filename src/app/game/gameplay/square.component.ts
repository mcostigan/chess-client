import {Component, Input, OnInit} from '@angular/core';
import {Square} from "../../../model/square";
import {IServerMove} from "../../../model/move";

@Component({
  selector: 'app-square',
  template: `
    <div [className]="squareColor()" (click)="onClick()">
      <div [className]="(isHighlight() ? 'highlight mask' : 'mask')">
        <div class="square-contents" *ngIf="square.piece">
          <app-piece class="piece" [piece]="square.piece"></app-piece>
        </div>

        <div class="square-contents" *ngIf="!square.piece">

        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .square {
        border: 1px solid black;
        width: 80px;
        height: 80px;
      }

      .dark-square {
        background-color: gray;
      }

      .light-square {
        background-color: white;
      }

      .mask {
        height: 100%;
        width: 100%;
      }

      .highlight {
        background-color: rgba(200, 0, 0, .5);
        height: 100%;
        width: 100%;
      }

      .piece {
        height: 100%;
        width: 100%
      }

      .square-contents {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class SquareComponent implements OnInit {
  @Input() square!: Square
  @Input() position!: [number, number]
  @Input() highlightMoves!: (moves: IServerMove[]) => void
  @Input() removeHighlight!: () => void
  @Input() sendMove!: (move: IServerMove) => void

  constructor() {
  }

  ngOnInit(): void {
  }

  squareColor(): string {
    if ((this.position[0] + this.position[1]) % 2 == 1) {
      return "square dark-square"
    } else {
      return "square light-square"
    }
  }

  onClick() {
    if (this.square.movesTo.length) {
      // TODO: handle multiple moves
      this.sendMove(this.square.movesTo[0])
    } else if (this.square.movesFrom.length) {
      this.removeHighlight()
      this.highlightMoves(this.square.movesFrom)
    } else {
      this.removeHighlight()
    }
  }

  isHighlight() {
    return this.square.movesTo.length > 0
  }

}
