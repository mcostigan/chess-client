import {Game, IPlayer} from "../../../model/game";
import {Component, OnInit, Type} from "@angular/core";

export interface GameStateComponent {
  game: Game
}

export class GameStateComponentFactory {
  get(state: string): Type<GameStateComponent> {
    switch (state) {
      case "Pending":
        return PendingGameComponent
      case "Live":
        return LiveGameComponent
      case "Complete":
        return CompleteGameComponent
      default:
        return PendingGameComponent
    }
  }

}


@Component({
  selector: 'pending-game',
  template: `
    <div class="pending-game">
      <player [player]="game.white" [turn]="null" [color]="0"></player>
      <player [player]="pendingPlayer" [turn]="null" [color]="1"></player>
    </div>
  `,
  styles: [
    `
      .pending-game {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        column-gap: 100px;
      }
    `
  ]
})
export class PendingGameComponent implements OnInit, GameStateComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

  game!: Game

  pendingPlayer: IPlayer = {
    id: '',
    name: 'Waiting...',
    'photo': 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
}


@Component({
  selector: 'live-game',
  template: `
    <div class="live-game">
      <player [player]="game.white" [turn]="game.turn" [color]="0"></player>
      <board [board]="game.board!!">
      </board>
      <player [player]="game.black" [turn]="game.turn" [color]="1" class="opponent"></player>
    </div>
  `,
  styles: [
    `
      .live-game {
        width: max-content;
      }

      .opponent {
        float: right;
      }
    `
  ]
})
export class LiveGameComponent implements OnInit, GameStateComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

  game!: Game

}

@Component({
  selector: 'complete-game',
  template: `
    <div class="complete-game">
      <board [board]="game.board!!"></board>
      <div class="pop-up">
        <h1>Checkmate!</h1>
      </div>
    </div>
  `,
  styles: [
    `
      .pop-up {
        background-color: rgba(255, 255, 255, .5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      h1 {
        text-align: center;
      }
    `
  ]
})
export class CompleteGameComponent implements OnInit, GameStateComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

  game!: Game

}

