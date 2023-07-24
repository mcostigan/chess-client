import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'http://localhost:8080'

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
  }

  post<T>(endpoint: string, body: object = {}, withToken: boolean = false) {
    let headers = this.getHeaders(withToken)
    return this.httpClient.post<T>(`${this.BASE_URL}/${endpoint}`, body, {headers})
  }

  private getHeaders(withBearerToken: boolean): HttpHeaders {
    let headers = new HttpHeaders()
    if (withBearerToken) {
      headers = headers.set("Authorization", `Bearer ${this.tokenService.get()}`)
    }
    return headers
  }

}
