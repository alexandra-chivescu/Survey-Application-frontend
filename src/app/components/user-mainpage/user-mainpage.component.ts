import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css']
})
export class UserMainpageComponent implements OnInit {

  constructor( private router : Router,
               private authService : AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == '' || localStorage.getItem('email') == '' || localStorage.getItem('isLoggedIn') == "false") {
      this.router.navigate(['/login-user']);
    }
  }


}
