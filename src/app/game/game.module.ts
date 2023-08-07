import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewGameComponent} from './new-game/new-game.component';
import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game.component";
import {BoardComponent} from './gameplay/board.component';
import {PieceComponent} from './gameplay/piece.component';
import {SquareComponent} from './gameplay/square.component';
import {FormsModule} from "@angular/forms";
import {PlayerComponent} from './player.component';
import {GameStateDirective} from './gameState/game-state.directive';
import {CompleteGameComponent, LiveGameComponent, PendingGameComponent} from './gameState/game-state';
import {CapturedPiecesComponent} from './captured-pieces.component';
import {GamePlayerComponent} from './game-player.component'
import {AuthGuard} from "../auth/auth.guard";
import { ExperienceSelectorComponent } from './new-game/experience-selector.component';

const routes: Routes = [
  {
    path: "", canActivate: [AuthGuard], children: [
      {path: "", component: NewGameComponent},
      {path: "game/:gameId", component: GameComponent}
    ]
  }
]

@NgModule({
  declarations: [
    NewGameComponent,
    GameComponent,
    BoardComponent,
    PieceComponent,
    SquareComponent,
    PlayerComponent,
    GameStateDirective,
    PendingGameComponent,
    LiveGameComponent,
    CompleteGameComponent,
    CapturedPiecesComponent,
    GamePlayerComponent,
    ExperienceSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ]
})
export class GameModule {

}
