import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from "../../model/game";
import {PieceColor, PieceType} from "../../model/piece";
import {PieceDrawerService} from "./gameplay/piece-drawer.service";

@Component({
  selector: 'player',
  template: `
    <div *ngIf="player" [class]="classes">
      <div class="player-photo">
        <img src="{{player.photo}}" alt="">
      </div>
      <div class="player-details">
        <div class="player-name">{{player.name}}</div>
        <div class="player-color">{{examplePiece}}</div>
      </div>

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
        column-gap: 25px;
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

      .player-details{
        display: flex;
        flex-direction: column;
      }

      .player-name {
        font-size: large;
      }

      .player-color {
        font-size: x-large;
      }
    `
  ]
})
export class PlayerComponent implements OnInit {
  @Input() player: IPlayer | null = null
  @Input() color!: PieceColor
  @Input() turn: PieceColor | null = null
  examplePiece: string = ''

  constructor(private pieceDrawerService: PieceDrawerService) {
  }

  ngOnInit(): void {
    this.examplePiece = this.pieceDrawerService.getUnicode(PieceType.PAWN, this.color)
  }

  isTurn(): boolean {
    return this.color == this.turn
  }

  get classes(): string {
    return `player ${(this.isTurn()) ? 'isTurn' : ''}`
  }

}
