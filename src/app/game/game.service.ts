import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {Game, IGame, IPlayer} from "../../model/game";
import {GameFactory} from "./game.factory";
import {WebSocketService} from "../service/web-socket.service";
import {map, Observable} from "rxjs";
import {IMessage} from "@stomp/stompjs";
import {IMoveResult, IServerMove} from "../../model/move";

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
        this.currentGame = this.gameFactory.get(game, this.subscribeToGameAddPlayer.bind(this), this.subscribeToGameMove.bind(this), this.subscribeToMyMoves.bind(this))
        void this.router.navigateByUrl(`/game/${game.id}`)
      }
    )
  }

  private subscribeToGameAddPlayer(gameId: string): Observable<IPlayer> {
    return this.webSocketService.subscription(`/topic/game/${gameId}/players`).pipe(
      map((m: IMessage) => JSON.parse(m.body) as IPlayer))
  }

  private subscribeToGameMove(gameId: string): Observable<IMoveResult> {
    return this.webSocketService.subscription(`/topic/game/${gameId}/move`).pipe(
      map((m: IMessage) => JSON.parse(m.body) as IMoveResult)
    )
  }

  private subscribeToMyMoves(gameId: string): Observable<IServerMove[]> {
    return this.webSocketService.subscription(`/user/topic/game/${gameId}/moves`).pipe(
      map((m: IMessage) => JSON.parse(m.body) as IServerMove[])
    )
  }

  sendMove(gameId: string, move: any) {
    return this.webSocketService.publish(`/app/game/${gameId}/move`, JSON.stringify(move))
  }

  getCurrentGame(): Game {
    return this.currentGame!!
  }
}
