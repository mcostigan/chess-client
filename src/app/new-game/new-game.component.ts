import {Component, OnInit} from '@angular/core';
import {GameService} from "./game.service";

@Component({
  selector: 'app-new-game',
  template: `
    <button (click)="createGame()">Create</button>
  `,
  styles: []
})
export class NewGameComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  createGame() {
    this.gameService.createGame()
  }

}
