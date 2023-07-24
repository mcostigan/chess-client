import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewGameComponent} from './new-game.component';
import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game.component";
import { BoardComponent } from './gameplay/board.component';
import { PieceComponent } from './gameplay/piece.component';
import { SquareComponent } from './gameplay/square.component';

const routes: Routes = [
  {path: "", component: NewGameComponent},
  {path: "game/:gameId", component: GameComponent}
]

@NgModule({
  declarations: [
    NewGameComponent,
    GameComponent,
    BoardComponent,
    PieceComponent,
    SquareComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class GameModule {

}
