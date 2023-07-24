import {Injectable} from '@angular/core';
import {Game, IGame, IPlayer} from "../../model/game";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameFactory {

  constructor() {
  }

  get(game: IGame, onAddPlayer: (gameId: string) => Observable<IPlayer>): Game {
    let g = new Game(game.id, game.white, game.black)

    // subscribe game to new players
    onAddPlayer(game.id).subscribe(
      (player: IPlayer) => {
        g.addPlayer(player)
      }
    )

    return g
  }
}
