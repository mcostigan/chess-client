import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="authentication">
      <app-register></app-register>
      <login></login>

    </div>
  `,
  styles: [
    `
        .authentication{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
    `
  ]
})
export class AuthComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
