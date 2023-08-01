import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from "../../model/game";
import {PieceColor} from "../../model/piece";

@Component({
  selector: 'player',
  template: `
    <div *ngIf="player" [class]="classes">
      <div class="player-photo">
        <img src="{{player.photo}}" alt="">
      </div>
      <div class="player-name">{{player.name}}</div>
    </div>
  `,
  styles: [
    `
      .player {
        border: 1px solid black;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        width: 200px;
        padding: 5px;
      }

      .isTurn {
        border: 5px solid gray;
      }

      .player-photo {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }

      .player-name {
        font-size: large;
      }
    `
  ]
})
export class PlayerComponent implements OnInit {
  @Input() player: IPlayer | null = null
  @Input() color!: PieceColor
  @Input() turn: PieceColor | null = null

  constructor() {
  }

  ngOnInit(): void {
  }

  isTurn(): boolean {
    return this.color == this.turn
  }

  get classes(): string {
    return `player ${(this.isTurn()) ? 'isTurn' : ''}`
  }

}
