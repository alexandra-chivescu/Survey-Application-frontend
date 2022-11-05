import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css']
})
export class UserMainpageComponent implements OnInit {

  constructor( private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == '' || localStorage.getItem('email') == '' || localStorage.getItem('isLoggedIn') == "false") {
      this.router.navigate(['/login-user']);
    }

  }

  public logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('email', '');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/home'])
  }

}
