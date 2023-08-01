import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from "./game.service";
import {Game, GameState} from "../../model/game";
import {GameStateComponent, GameStateComponentFactory} from "./gameState/game-state";
import {GameStateDirective} from "./gameState/game-state.directive";

@Component({
  selector: 'app-game',
  template: `
    <div class="game">
      <div>
        <ng-template gameState></ng-template>
      </div>
    </div>

  `,
  styles: [
    `
      .game {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
      }
    `
  ]
})
export class GameComponent implements OnInit {

  game: Game

  private gameStateComponentFactory = new GameStateComponentFactory()
  @ViewChild(GameStateDirective, {static: true}) gameState!: GameStateDirective

  constructor(private gameService: GameService) {
    this.game = gameService.getCurrentGame()
  }

  ngOnInit(): void {
    this.setStateComponent(this.game.getState())
    this.game.subscribeToState().subscribe(
      (state: GameState) => {
        this.setStateComponent(state.name)
      }
    )
  }

  private setStateComponent(state: string) {
    const viewContainerRef = this.gameState.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<GameStateComponent>(
      this.gameStateComponentFactory.get(state)
    );
    componentRef.instance.game = this.game;
  }

}
