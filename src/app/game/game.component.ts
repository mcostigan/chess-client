import {Component, OnInit} from '@angular/core';
import {GameService} from "./game.service";
import {Game} from "../../model/game";

@Component({
  selector: 'app-game',
  template: `
    <div>
      {{game.getState()}}
    </div>

    <div>
      {{game?.white?.name}} vs {{game?.black?.name}}
    </div>

    <board [board]="game.board!!" *ngIf="game.getState() === 'Live'">

    </board>

  `,
  styles: []
})
export class GameComponent implements OnInit {

  game: Game

  constructor(private gameService: GameService) {
    this.game = gameService.getCurrentGame()
  }

  ngOnInit(): void {
  }

}
