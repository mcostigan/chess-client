import {Component, OnInit} from '@angular/core';
import {GameService} from "./game.service";

@Component({
  selector: 'app-game',
  template: `
    <div class="new-game">
      <div class="center-horiz">
        <h1>Create Game</h1>
      </div>
      <div class="center-horiz">
        <input [(ngModel)]="minExperience" placeholder="Minimum Experience">
      </div>
      <div class="center-horiz">
        <input [(ngModel)]="maxExperience" placeholder="Maximum Experience">
      </div>
      <div class="center-horiz">
        <button (click)="createGame()">Create</button>
      </div>

    </div>

  `,
  styles: [
    `
      input, button {
        width: 200px;
      }

      button {
        border-radius: 50px;
      }

      .new-game {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 100%;
      }`
  ]
})
export class NewGameComponent implements OnInit {
  minExperience: string = ""
  maxExperience: string = ""

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  createGame() {
    this.gameService.createGame(this.minExperience, this.maxExperience)
  }

}
