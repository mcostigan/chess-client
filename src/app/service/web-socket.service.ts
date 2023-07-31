import {Injectable} from '@angular/core';
import {StompHeaders, StompService} from "@stomp/ng2-stompjs";
import {TokenService} from "./token.service";
import {Observable} from "rxjs";
import {IMessage} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private _isConnected : boolean = false

  constructor(private rxStomp: StompService, private tokenService: TokenService) {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/chess-websocket',
      heartbeatOutgoing: 0,
      heartbeatIncoming: 0,
      connectHeaders: {'Authorization': `Bearer ${this.tokenService.get()}`},
    })
    this.rxStomp.activate()
  }

  publish(topic: string, message: string | undefined = undefined) {

    const headers: StompHeaders = {
      Authorization: `Bearer ${this.tokenService.get()}`
    };
    this.rxStomp.publish(topic, message, headers)
  }

  subscription(topic: string): Observable<IMessage> {
    return this.rxStomp.subscribe(topic)
  }
}
