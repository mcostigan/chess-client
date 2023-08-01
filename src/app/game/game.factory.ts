import {Injectable} from '@angular/core';
import {Game, IGame, IPlayer} from "../../model/game";
import {Observable} from "rxjs";
import {IMoveResult, IServerMove} from "../../model/move";
import {MoveExecutionService} from "./move-execution.service";

@Injectable({
  providedIn: 'root'
})
export class GameFactory {

  constructor(private moveExecutionService: MoveExecutionService) {
  }

  get(game: IGame, onAddPlayer: (gameId: string) => Observable<IPlayer>, onMove: (gameId: string) => Observable<IMoveResult>, availableMoves: (gameId: string) => Observable<IServerMove[]>): Game {
    let g = new Game(game.id, game.white, game.black, this.moveExecutionService)

    // subscribe game to new players
    onAddPlayer(game.id).subscribe(
      (player: IPlayer) => {
        g.addPlayer(player)
      }
    )

    onMove(game.id).subscribe(
      (move: IMoveResult) => {
        g.move(move)
      }
    )

    return g
  }
}
