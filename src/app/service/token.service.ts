import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private KEY = "CHESS_ACCESS_TOKEN"

  constructor() {
  }

  get(): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${this.KEY}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || '';
    }
    return '';
  }

  set(val: string) {
    document.cookie = `${this.KEY}=${val}`
  }
}
