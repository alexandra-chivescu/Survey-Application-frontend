import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  public generateRandomToken() {
    const rand = Math.random().toString(36).substring(2);
    return rand + rand;
  }

  public loginInit (email: string) {
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('email', email);
    localStorage.setItem('token', this.generateRandomToken());

    this.router.navigate(['/home-user']);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.setItem('email', '');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/home']);
  }

  public verifyUserConnection() {
    if (localStorage.getItem('token') != '' && localStorage.getItem('email') != '' && localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/home-user']);
    } else {
      this.router.navigate(['/login-user']);
    }
  }


}
