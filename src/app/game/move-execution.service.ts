import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {IServerMove} from "../../model/move";

@Injectable({
  providedIn: 'root'
})
export class MoveExecutionService {

  constructor() {
  }

  execute(board: Board, move: IServerMove) {
    board.squares[move.to.first][move.to.second] = board.squares[move.from.first][move.from.second]
    board.squares[move.from.first][move.from.second] = null
  }
}
