import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {Question} from "../../models/question.model";
import {Answer} from "../../models/answer.model";
import {Survey} from "../../models/survey.model";
import {FormControl, FormGroup} from "@angular/forms";
import {CompletedSurveyDto} from "../../models/completedSurveyDto.model";
import {User} from "../../models/user.model";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-complete-survey',
  templateUrl: './complete-survey.component.html',
  styleUrls: ['./complete-survey.component.css']
})
export class CompleteSurveyComponent implements OnInit {
  public surveyId: number | any;
  public completeSurveyForm: FormGroup | any;
  public questions: Question[] | any;
  public answers: Answer[] | any = [];
  public surveys: Survey[] | any;
  public completedSurvey: CompletedSurveyDto | any;
  public users: User[] | any = [];
  public user: User | any;
  public allAnswers: Answer[] | any;
  public modifiedAnswer: Answer | any;
  public noOfAnswersGiven : number = 0;


  constructor(private data: DataService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => {
      console.log('received ', message)
      return this.surveyId = message;
    });
    this.getQuestions();
    this.getAnswers();
    this.getSurveyById();
    this.getUserByEmail();
    this.completeSurveyForm = new FormGroup({
      'answer': new FormControl()
    });
  }

  public getQuestions(): void {
    this.userService.getQuestionsBySurveyId(this.surveyId).subscribe({
        next: (response: Question[]) => {
          this.questions = response;
        },
        error: (error) => {
          // alert(error.message);
        }
      }
    )
  }

  public getAnswers(): void {
    this.userService.getAnswers().subscribe(
      {
        next: (response: Answer[]) => {
          this.answers = response
        },
        error: (error) => {
          // alert(error.message);
        }
      }
    )
  }

  public getSurveyById(): void {
    this.userService.getSurveyById(this.surveyId).subscribe({
        next: (response: Survey[]) =>
          this.surveys = response,
        error: (error) => {
          // alert(error.message);
        }
      }
    )
  }

  public getUserByEmail(): void {
    // @ts-ignore
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      {
        next: (response: User[]) =>
          this.users.push(response),
        error(error) {
          // return alert(error.message);
        }
      }
    )
  }

  public modifyAnswer(answerId: number, questionId: number, answer: string, noResponses: number) {
    this.modifiedAnswer = new Answer(answerId, questionId, answer, noResponses);
    this.userService.modifyAnswer(this.modifiedAnswer).subscribe(
      {
        next: (response: Answer) => {
          this.modifiedAnswer = response;
        },
        error: (error) => {
          // alert(error.message);
        }
      }
    )
  }

  public saveCompletedSurvey(): void {
    if (this.completeSurveyForm.invalid) {
      console.log("Invalid");
    } else {
      this.completedSurvey = new CompletedSurveyDto(this.users[0].id, this.surveyId);

      console.log("Calling:")
      this.userService.completedSurvey(this.completedSurvey).subscribe({
        next: (response: CompletedSurveyDto) => {
          this.completedSurvey = response;
        },
        error: (error) => {
          // alert(error.message);
        }
      });

      this.userService.getAnswers().subscribe(
        {
          next: async (response: Answer[]) => {
            this.allAnswers = response;
            for (var i = 0; i < this.answers.length; i++) {
              this.allAnswers[i].noResponses = this.allAnswers[i].noResponses + this.answers[i].noResponses;
              //metoda care duce la endpoint-ul unde inlocuiesc datele cu cele updatate dupa adunarea numarului de raspunsuri
              this.modifyAnswer(this.allAnswers[i].id, this.allAnswers[i].question_id, this.allAnswers[i].answer, this.allAnswers[i].noResponses);
              await delay(50)
            }
          },
          error: (error) => {
            // alert(error.message);
          }
        }
      )
    }
  }

  public addResponse(answerId: number, questionId: number) {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].noResponses != 0 && this.answers[i].question_id == this.questions.filter((value: { id: number; }) => value.id === questionId)[0].id) {
        this.answers[i].noResponses = 0;
        console.log('set : ' + this.answers[i].id + " to 0")
      }
    }
    const selectedAnswers = this.answers.filter((answer: { id: number; }) => answer.id === answerId)[0];
    selectedAnswers.noResponses++;
    console.log('incremented ' + answerId + ' to ' + selectedAnswers.noResponses)
  }

}
