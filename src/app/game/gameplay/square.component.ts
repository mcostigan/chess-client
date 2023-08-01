import {Component, Input, OnInit} from '@angular/core';
import {Square} from "../../../model/square";
import {IServerMove} from "../../../model/move";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-square',
  template: `
    <div [className]="classes" (click)="onClick()">
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
        box-sizing: border-box;
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

      .clickable {
        cursor: pointer;
      }

      .clickable:hover {
        border: 2px solid black;
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

  private movesFrom: IServerMove[] = []
  movesTo: IServerMove[] = []

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {
    let gameId = this.activatedRoute.snapshot.paramMap.get('gameId')!!
    this.gameService.subscribeToMyMoves(gameId).subscribe(
      (moves) => {
        this.movesFrom = moves.filter((move) => move.from.first == this.position[0] && move.from.second == this.position[1])
      }
    )
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log("clicked square")
    console.log(this)
    if (this.movesTo.length) {
      // TODO: handle multiple moves
      this.sendMove(this.movesTo[0])
    } else if (this.movesFrom.length) {
      this.removeHighlight()
      this.highlightMoves(this.movesFrom)
    } else {
      this.removeHighlight()
    }
  }

  isHighlight() {
    return this.movesTo.length > 0
  }

  get classes(): string {
    let classes: string[] = ['square']
    if ((this.position[0] + this.position[1]) % 2 == 1) {
      classes.push("dark-square")
    } else {
      classes.push("light-square")
    }

    if (this.movesFrom.length || this.movesTo.length) {
      classes.push("clickable")
    }

    return classes.join(" ")
  }

}
