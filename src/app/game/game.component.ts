import {Component, OnInit} from '@angular/core';
import {GameService} from "./game.service";
import {Game} from "../../model/game";

@Component({
  selector: 'app-game',
  template: `
    <div>
      {{game.getState()}}
    </div>

    <div class="board">
      <player [player]="game.white" [turn]="game.turn" [color]="0" ></player>
      <board [board]="game.board!!" *ngIf="game.getState() === 'Live'">
      </board>
      <player [player]="game.black" [turn]="game.turn" [color]="1" class="opponent"></player>
    </div>


  `,
  styles: [
    `
      .board {
        width: max-content;
      }
      .opponent {
        float: right;
      }
    `
  ]
})
export class GameComponent implements OnInit {

  game: Game

  constructor(private gameService: GameService) {
    this.game = gameService.getCurrentGame()
  }

  ngOnInit(): void {
  }

}
