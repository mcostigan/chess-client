import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewGameComponent} from './new-game.component';
import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game.component";

const routes: Routes = [
  {path: "", component: NewGameComponent},
  {path: "game/:gameId", component: GameComponent}
]

@NgModule({
  declarations: [
    NewGameComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class GameModule {

}
