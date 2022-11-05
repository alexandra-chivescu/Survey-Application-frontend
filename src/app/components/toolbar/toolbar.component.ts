import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public email : string | any;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.email = localStorage.getItem('email').substring(0, localStorage.getItem('email').indexOf('@'));
  }

  public logout () {
    this.authService.logout();
  }

}
