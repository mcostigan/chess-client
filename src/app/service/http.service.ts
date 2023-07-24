import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'http://localhost:8080'
  constructor(private httpClient: HttpClient) { }

  post<T>(endpoint: string, body: object = {}){
    return this.httpClient.post<T>(`${this.BASE_URL}/${endpoint}`, body)
  }


}
