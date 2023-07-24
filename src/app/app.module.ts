import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from "./auth/auth.module";
import {NewGameModule} from "./new-game/new-game.module";
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router'
import {GameModule} from "./game/game.module";
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    NewGameModule,
    GameModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StompService, StompConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
