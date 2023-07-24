import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../model/board";

@Component({
  selector: 'board',
  template: `
    <div class="board">
      <div class="rank" *ngFor="let rank of board.squares">
        <app-square [piece]="square" *ngFor="let square of rank"></app-square>
      </div>
    </div>
  `,
  styles: [
    `
      .rank {
        display: flex;
        flex-direction: column;
      }

      .board {
        display: flex;
        flex-direction: row;
      }
    `
  ]
})
export class BoardComponent implements OnInit {
  @Input() board!: Board

  constructor() {
  }

  ngOnInit(): void {
  }

}
