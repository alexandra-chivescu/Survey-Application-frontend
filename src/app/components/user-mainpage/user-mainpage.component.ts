import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Survey} from "../../models/survey.model";
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {CompletedSurvey} from "../../models/completedSurvey.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css']
})
export class UserMainpageComponent implements OnInit {
  public surveys: Survey[] | any;
  public gridColumns: number | any;
  public surveyId: number | any;
  public completedSurveys: [] | any = [];
  public users: User[] | any;
  public username : string | any;
  public isCreator : boolean | any;


  constructor(private router: Router,
              private userService: UserService,
              private data: DataService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == '' || localStorage.getItem('email') == '' || localStorage.getItem('isLoggedIn') == "false") {
      this.router.navigate(['/login-user']);
    }
    this.getUserByEmail();
    this.gridColumns = 3;
    this.data.currentMessage.subscribe(message => this.surveyId = message);
  }

  public getUserByEmail(): void {
    // @ts-ignore
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe({
        next: (response: User[]) => {
          this.users = response;
          this.getSurveys();
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public getSurveys(): void {
    this.userService.getSurveys().subscribe({
        next: (response: Survey[]) => {
          this.surveys = response;
          this.checkIfSurveysWereCompletedByCurrentUser();
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public checkIfSurveysWereCompletedByCurrentUser() {
    for (let i = 0; i < this.surveys.length; i++) {
      this.userService.getCompletedSurveyByUserIdAndSurveyId(this.users[0].id, this.surveys[i].id).subscribe(
        {
          next: (response: CompletedSurvey[]) => {
            this.completedSurveys.push(response.length != 0);
          },
          error: (error) => alert(error.message)
        }
      )
    }
  }

  public isActive(id: number): boolean {
    let date: string = this.surveys[id].end_date;
    let [month, day, year] = date.split('-');
    var convertedDate = new Date(+year, +month - 1, +day);
    if (convertedDate.getTime() < Date.now())
      return false;
    return true;
  }

  public newSurveyId(surveyId: number) {
    this.data.changeMessage(surveyId);
  }

  public verifyCreator(surveyId : number) : boolean {
    this.isCreator = localStorage.getItem('email') === this.surveys[surveyId].creator;
    return this.isCreator;
  }

}
