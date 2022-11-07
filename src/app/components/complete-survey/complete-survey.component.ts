import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {Question} from "../../models/question.model";
import {Answer} from "../../models/answer.model";
import {Survey} from "../../models/survey.model";

@Component({
  selector: 'app-complete-survey',
  templateUrl: './complete-survey.component.html',
  styleUrls: ['./complete-survey.component.css']
})
export class CompleteSurveyComponent implements OnInit {
  public surveyId : number | any;
  public questions : Question[] | any;
  public answers : Answer[] | any;
  public surveys : Survey[] | any;

  constructor(private data : DataService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.surveyId = message);
    console.log(this.surveyId);
    this.getQuestions();
    this.getAnswers();
    this.getSurveyById();
  }

  public getQuestions() : void {
    this.userService.getQuestions(this.surveyId).subscribe({
        next : (response : Question[]) => {
          this.questions = response;
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public getAnswers() : void {
    this.userService.getAnswers().subscribe(
      {
        next : (response : Answer[]) =>
          this.answers = response,
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public getSurveyById() : void {
    this.userService.getSurveyById(this.surveyId).subscribe({
        next : (response : Survey[]) =>
          this.surveys = response,
        error: (error) =>
          alert(error.message)
      }
    )
  }

}
