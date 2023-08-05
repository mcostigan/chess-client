import {Component, Input, OnInit} from '@angular/core';
import {PieceColor} from "../../model/piece";
import {Game, IPlayer} from "../../model/game";

@Component({
  selector: 'app-game-player',
  template: `
    <div [class]="classes">
      <player class="player" [player]="player" [turn]="game.turn" [color]="color"></player>
      <app-captured-pieces class="captured-pieces" [board]="game.board!!" [color]="color"></app-captured-pieces>
    </div>

  `,
  styles: [
    `
      .game-player {
        display: grid;
      }

      .black-player {
        grid-template-columns: calc(100% - 200px) 200px;
        grid-template-areas: "captured-pieces player";
      }

      .white-player {
        grid-template-columns: 200px calc(100% - 200px);
        grid-template-areas: "player captured-pieces";
      }

      .player {
        grid-area: player;
      }

      .captured-pieces {
        grid-area: captured-pieces;
      }
    `
  ]
})
export class GamePlayerComponent implements OnInit {
  @Input() color!: PieceColor
  @Input() game!: Game
  player: IPlayer | null = null
  classes: string = ''

  constructor() {
  }

  ngOnInit(): void {
    if (this.color == PieceColor.WHITE) {
      this.player = this.game.white!!
      this.classes = 'game-player white-player'
    } else {
      this.player = this.game.black!!
      this.classes = 'game-player black-player'
    }
  }

}
