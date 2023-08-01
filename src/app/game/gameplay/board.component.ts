import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Board} from "../../../model/board";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {IServerMove} from "../../../model/move";
import {SquareComponent} from "./square.component";

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
export class BoardComponent implements OnInit, AfterViewInit {
  @Input() board!: Board
  @ViewChildren(SquareComponent) squares!: QueryList<SquareComponent>

  private readonly gameId: string

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId')!!
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  sendMove(move: IServerMove) {
    this.gameService.sendMove(this.gameId, move)
    this.removeHighlight()
  }

  highlightMoves(moves: IServerMove[]) {
    console.log(moves)
    moves.forEach((move) => {
      this.squares.get(move.to.first * 8 + move.to.second)!!.movesTo = [move]
      console.log(this.squares.get(move.to.first * 8 + move.to.second))
    })
  }

  removeHighlight() {
    this.squares.forEach((square) => {
      square.movesTo = []
    })
  }

}
