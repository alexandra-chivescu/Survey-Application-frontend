import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Survey} from "../../models/survey.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css']
})
export class UserMainpageComponent implements OnInit {
  public surveys : Survey[] | any;
  public gridColumns: number | any;
  public surveyId : number | any;


  constructor( private router : Router,
               private userService : UserService,
               private data : DataService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == '' || localStorage.getItem('email') == '' || localStorage.getItem('isLoggedIn') == "false") {
      this.router.navigate(['/login-user']);
    }
    this.getSurveys();
    this.gridColumns = 3;

    this.data.currentMessage.subscribe(message => this.surveyId = message);
  }

  public getSurveys() : void {
    this.userService.getSurveys().subscribe({
        next : (response : Survey[]) =>
        this.surveys = response,
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public isActive(id : number) : boolean {
      let date: string = this.surveys[id].end_date;
      let [month, day, year] = date.split('-');
      var convertedDate = new Date(+year, +month - 1, +day);
      if(convertedDate.getTime() < Date.now())
        return false;
      return true;
    }

    public newSurveyId(surveyId : number) {
      this.data.changeMessage(surveyId);
    }

}
