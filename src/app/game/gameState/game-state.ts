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
      <player [player]="game.white" [turn]="game.turn" [color]="0"></player>
      <player [player]="pendingPlayer" [turn]="game.turn" [color]="1"></player>
    </div>
  `,
  styles: [
    `
      .pending-game {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
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
      <div>done</div>
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
export class CompleteGameComponent implements OnInit, GameStateComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

  game!: Game

}

