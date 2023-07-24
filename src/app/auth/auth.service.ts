import {Injectable} from '@angular/core';
import {HttpService} from "../service/http.service";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService, private tokenService: TokenService, private router: Router) {
  }

  authenticate(name: string, password: string, redirect: string = "") {
    this.httpService.post<{ token: string }>("auth/login", {name, password}).subscribe(
      (token) => {
        this.tokenService.set(token.token)
        void this.router.navigateByUrl("")
      }
    )
  }

  register(user: string, password: string) {

  }
}
