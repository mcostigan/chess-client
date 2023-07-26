import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../model/board";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'board',
  template: `
    <button (click)="move()">Move</button>
    <div class="board">
      <div class="rank" *ngFor="let rank of board.squares; let i = index">
        <app-square [position]="[i,j]" [piece]="square" *ngFor="let square of rank let j=index"></app-square>
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

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('gameId')!!
  }

  ngOnInit(): void {
  }

  move() {
    this.gameService.sendMove(this.gameId, {from: {first: 1, second: 0}, to: {first: 2 ,second: 0}})
  }

}
