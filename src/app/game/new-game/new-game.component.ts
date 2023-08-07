import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Experience} from "./experience-selector.component";

@Component({
  selector: 'app-game',
  template: `
    <div class="new-game">
      <div class="center-horiz">
        <h1>Create Game</h1>
      </div>
      <div class="center-horiz">
        <label>Min Experience</label>
        <app-experience-selector [(experience)]="minExperience"></app-experience-selector>
      </div>
      <div class="center-horiz">
        <label>Max Experience</label>
        <app-experience-selector [(experience)]="maxExperience"></app-experience-selector>
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
  minExperience: Experience = Experience.NOVICE
  maxExperience: Experience = Experience.EXPERT

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  createGame() {
    this.gameService.createGame(this.minExperience.valueOf().toUpperCase(), this.maxExperience.valueOf().toUpperCase())
  }

}
