import {Component, OnInit} from '@angular/core';
import {GameService} from "../new-game/game.service";
import {IGame} from "../../model/game";

@Component({
  selector: 'app-game',
  template: `
    <p>
      {{game?.white.name}} vs {{game?.black.name}}
    </p>
  `,
  styles: []
})
export class GameComponent implements OnInit {

  game: IGame

  constructor(private gameService: GameService) {
    this.game = gameService.getCurrentGame()
  }

  ngOnInit(): void {
  }

}
