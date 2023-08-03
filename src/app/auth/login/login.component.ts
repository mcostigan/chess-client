import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'login',
  templateUrl: `./login.component.html`,
  styles: []
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  protected submit: (user: string, password: string) => void = this.authService.authenticate.bind(this.authService)
  header: string = "Login"

  constructor(protected authService: AuthService) {
  }

  ngOnInit(): void {
  }


  onClick() {
    this.submit(this.username, this.password)
  }

}
