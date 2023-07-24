import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'login',
  template: `
    <div class="user-input-form">
      <h1>Login</h1>
      <div class="user-name">
        <input [(ngModel)]="username" placeholder="User">
      </div>
      <div class="password">
        <input [(ngModel)]="password" type="password" placeholder="Password">
      </div>
      <div class="submit">
        <button (click)="login()">Login</button>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.username, this.password)
  }

}
