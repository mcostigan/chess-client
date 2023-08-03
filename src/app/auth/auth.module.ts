import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router'
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'login', component: AuthComponent}
]


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
