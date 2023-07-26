import {Injectable} from '@angular/core';
import {Game, IGame, IPlayer} from "../../model/game";
import {Observable} from "rxjs";
import {IClientMove, IServerMove} from "../../model/move";

@Injectable({
  providedIn: 'root'
})
export class GameFactory {

  constructor() {
  }

  get(game: IGame, onAddPlayer: (gameId: string) => Observable<IPlayer>, onMove: (gameId: string) => Observable<IServerMove>): Game {
    let g = new Game(game.id, game.white, game.black)

    // subscribe game to new players
    onAddPlayer(game.id).subscribe(
      (player: IPlayer) => {
        g.addPlayer(player)
      }
    )

    onMove(game.id).subscribe(
      (move: IClientMove) => {
        console.log(move)
      }
    )

    return g
  }
}
