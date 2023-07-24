import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {Game, IGame, IPlayer} from "../../model/game";
import {GameFactory} from "./game.factory";
import {WebSocketService} from "../service/web-socket.service";
import {map, Observable} from "rxjs";
import {IMessage} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpService, private router: Router, private gameFactory: GameFactory, private webSocketService: WebSocketService) {
  }

  private currentGame: Game | undefined

  createGame(minExperience: string = "NOVICE", maxExperience: string = "EXPERT") {
    this.httpService.post<IGame>("game", {minExperience, maxExperience}, true).subscribe(
      (game) => {
        this.currentGame = this.gameFactory.get(game, this.subscribeToGameAddPlayer.bind(this))
        void this.router.navigateByUrl(`/game/${game.id}`)
      }
    )
  }

  subscribeToGameAddPlayer(gameId: string): Observable<IPlayer> {
    return this.webSocketService.subscription(`/topic/game/${gameId}/players`).pipe(
      map((m: IMessage) => JSON.parse(m.body) as IPlayer))
  }

  sendMove(gameId: string, move: any) {
    return this.webSocketService.publish(`/app/game/${gameId}/move`, move)
  }

  getCurrentGame(): Game {
    return this.currentGame!!
  }
}
