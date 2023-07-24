import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from "./auth/auth.module";
import {GameModule} from "./game/game.module";
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router'
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    GameModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StompService, StompConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
