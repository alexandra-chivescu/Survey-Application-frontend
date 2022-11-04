import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";
import {MatButtonModule} from "@angular/material/button";
import { UserLoginComponent } from './user-login/user-login.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { UserMainpageComponent } from './user-mainpage/user-mainpage.component';
import {UserRegisterComponent} from "./user-register/user-register.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'login-user', component: UserLoginComponent},
  {path: 'register-user', component: UserRegisterComponent},
  {path: 'home-user', component: UserMainpageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    LandingPageComponent,
    UserMainpageComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatInputModule
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
