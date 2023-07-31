import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../model/board";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {IServerMove} from "../../../model/move";

@Component({
  selector: 'board',
  template: `
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

  private readonly gameId: string

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId')!!
  }

  ngOnInit(): void {
  }

  sendMove(move: IServerMove) {
    this.gameService.sendMove(this.gameId, move)
    this.removeHighlight()
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
