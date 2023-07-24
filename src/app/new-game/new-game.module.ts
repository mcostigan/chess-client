import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewGameComponent} from './new-game.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: "", component: NewGameComponent}
]

@NgModule({
  declarations: [
    NewGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class NewGameModule {

}
