import {Component} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: `../login/login.component.html`,
  styles: []
})
export class RegisterComponent extends LoginComponent {

  constructor(authService: AuthService) {
    super(authService);
  }

  override ngOnInit(): void {
  }

  override submit = this.authService.register.bind(this.authService)
  override header = "Register"
}
