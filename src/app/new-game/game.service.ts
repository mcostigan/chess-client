import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {IGame} from "../../model/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpService: HttpService, private router: Router) {
  }

  private currentGame: IGame | undefined

  createGame(minExperience: string = "NOVICE", maxExperience: string = "EXPERT") {
    this.httpService.post< IGame >("game", {minExperience, maxExperience}, true).subscribe(
      (game) => {
        this.currentGame = game
        this.router.navigateByUrl(`/game/${game.id}`)
      }
    )
  }

  getCurrentGame(): IGame {
    return this.currentGame!!
  }
}
