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

  pendingPlayer: IPlayer = {id: '', name: 'Waiting...', 'photo': ''}
}


@Component({
  selector: 'live-game',
  template: `
    <div class="board">
      <player [player]="game.white" [turn]="game.turn" [color]="0"></player>
      <board [board]="game.board!!">
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
export class LiveGameComponent implements OnInit, GameStateComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

  game!: Game

}

