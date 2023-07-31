import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../model/board";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {IServerMove} from "../../../model/move";

@Component({
  selector: 'board',
  template: `
    <div>
      <!--      TODO: better implementation-->
      <input type="number" [(ngModel)]="fromRow"> <input type="number" [(ngModel)]="fromCol"> <input type="number"
                                                                                                     [(ngModel)]="toRow">
      <input type="number" [(ngModel)]="toCol">
      <button (click)="move()">Move</button>
    </div>

    <div class="board">
      <div class="rank" *ngFor="let rank of board.squares; let i = index">
        <app-square [position]="[i,j]" [square]="square"
                    [highlightMoves]="highlightMoves.bind(this)"
                    [removeHighlight]="removeHighlight.bind(this)"
                    [sendMove]="sendMove.bind(this)"
                    *ngFor="let square of rank let j=index"></app-square>
      </div>
    </div>
  `,
  styles: [
    `
      .rank {
        display: flex;
        flex-direction: row;
      }

      .board {
        display: flex;
        flex-direction: column;
      }
    `
  ]
})
export class BoardComponent implements OnInit {
  @Input() board!: Board

  private gameId: string

  fromRow: number = -1
  fromCol: number = -1
  toRow: number = -1
  toCol: number = -1

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId')!!
  }

  ngOnInit(): void {
  }

  move() {
    this.gameService.sendMove(this.gameId, {
      from: {first: this.fromRow, second: this.fromCol},
      to: {first: this.toRow, second: this.toCol}
    })
  }

  sendMove(move: IServerMove) {
    this.gameService.sendMove(this.gameId, move)
  }

  highlightMoves(moves: IServerMove[]) {
    moves.forEach((move) => {
      this.board.squares[move.to.first][move.to.second].addMoveTo(move)
    })
  }

  removeHighlight() {
    this.board.squares.forEach((row) => {
      row.forEach((sq) => sq.movesTo = [])
    })
  }

}
