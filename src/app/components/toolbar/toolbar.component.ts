import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public username : string | any;
  public users : User[] | any;

  constructor(private authService : AuthService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    // @ts-ignore
    this.username = localStorage.getItem('email').substring(0, localStorage.getItem('email').indexOf('@'));
  }

  public logout () {
    this.authService.logout();
  }
  public getUserByEmail() : void {
    // @ts-ignore
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe({
        next : (response : User[]) =>
          this.users = response,
        error: (error) =>
          alert(error.message)
      }
    )
  }


}
