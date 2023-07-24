import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../model/board";

@Component({
  selector: 'board',
  template: `
    <div class="board">
      <div class="rank" *ngFor="let rank of board.squares; let i = index">
        <app-square [position]="[i,j]"  [piece]="square" *ngFor="let square of rank let j=index"></app-square>
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
