import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Survey} from "../../models/survey.model";
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {CompletedSurvey} from "../../models/completedSurvey.model";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ResultsSurveyComponent} from "../results-survey/results-survey.component";

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
  public users: User[] | any = [];
  public username: string | any;
  public isCreator: boolean | any;


  constructor(private router: Router,
              private userService: UserService,
              private data: DataService,
              private dialog: MatDialog) {
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
          this.users.push(response);
          console.log(this.users);
          this.getSurveys();
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public formatDate(date : string) : Date {
  console.log("Data: " + date);
  date = date.substring(0, 10);
  let [year, month, day] = date.split('-');
  const dateTypeDate= new Date(+year, +month - 1, +day);
  return dateTypeDate;
}

  public getSurveys(): void {
    this.userService.getSurveys().subscribe({
        next: (response: Survey[]) => {
          this.surveys = response;
          console.log(response);
          for (let i = 0; i < this.surveys.length; i++) {
            console.log("Start date: " + this.surveys[i].start_Date);
            console.log("End date: " + this.surveys[i].end_Date);
            this.surveys[i].start_Date = this.formatDate(this.surveys[i].start_Date);
            this.surveys[i].end_Date = this.formatDate(this.surveys[i].end_Date);
          }
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
          error: (error) => {
            console.log("User does not have any completed surveys.")
          }
        }
      )
    }
  }

  public stringDate(date: Date) : string {
    var arr = date.toString().split(" ");
    return arr[2] + " - " + arr[1] + " - " + arr[3];
  }

  public isActive(id: number): boolean {
    if (this.surveys[id].end_date < Date.now())
      return false;
    return true;
  }

  public newSurveyId(surveyId: number) {
    this.data.changeMessage(surveyId);
  }

  public verifyCreator(surveyId: number): boolean {
    this.isCreator = localStorage.getItem('email') === this.getSurveyById(surveyId)?.creator;
    return this.isCreator;
  }

  openDialog(surveyId: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      height: '300px',
      data: {
          id: surveyId,
          title: this.getSurveyById(surveyId).title,
          creator: this.getSurveyById(surveyId).creator,
          start_date: this.getSurveyById(surveyId).start_date,
          end_date: this.getSurveyById(surveyId).end_date
      }
    }).afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();

        if (shouldReload) window.location.reload();
      });
  }

  openDialogResults(surveyId: number): void {
    const dialogRef = this.dialog.open(ResultsSurveyComponent, {
      width: '500px',
      height: '550px',
      data: {
        id: surveyId,
        title: this.getSurveyById(surveyId).title,
        creator: this.getSurveyById(surveyId).creator,
        start_date: this.getSurveyById(surveyId).start_date,
        end_date: this.getSurveyById(surveyId).end_date,
      }
    }).afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();

        if (shouldReload) window.location.reload();
      });
  }

  public getSurveyById(surveyId : number) {
    return this.surveys.filter((survey: { id: number; }) => survey.id === surveyId)[0];
  }



}
