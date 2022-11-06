import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public isConnected : boolean | any;
  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != '' && localStorage.getItem('email') != '' && localStorage.getItem('isLoggedIn') == "true") {
      this.isConnected = true;
      this.router.navigate(['/home']);
    } else {
      this.isConnected = false;
      this.router.navigate(['/home']);
    }
  }

  public logout() {
    this.authService.logout();
  }

}
