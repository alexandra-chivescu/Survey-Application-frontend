import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Survey} from "../../models/survey.model";
import {Question} from "../../models/question.model";
import {Answer} from "../../models/answer.model";
import {Subject} from "rxjs";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})


export class CreateSurveyComponent implements OnInit {
  public NewSurveyGeneralDetails: FormGroup | any;
  public valuesQuestions = [];
  public survey: Survey | any;
  public surveys: Survey[] | any;
  public questions: Question[] = [];
  public question: Question | any;
  public answers : Answer[] = [];
  public answer : Answer | any;
  public questionsAreCompleted : Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {
  }

  get titleInput() {
    return this.NewSurveyGeneralDetails.get('surveyTitle');
  }

  ngOnInit(): void {
    this.questionsAreCompleted
      .subscribe(_ => this.createAnswersForQuestions());
    this.getSurveys();
    this.getQuestions();
    this.getAnswers();
    this.NewSurveyGeneralDetails = new FormGroup({
      'surveyTitle': new FormControl('', Validators.required),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required]),
      'question1': new FormControl('', [Validators.required]),
      'question2': new FormControl('', [Validators.required]),
      'question3': new FormControl('', [Validators.required]),
      'question4': new FormControl('', [Validators.required]),
      'question5': new FormControl('', [Validators.required]),
      'question6': new FormControl('', [Validators.required]),
      'question7': new FormControl('', [Validators.required]),
      'question8': new FormControl('', [Validators.required]),
      'question9': new FormControl('', [Validators.required]),
      'question10': new FormControl('', [Validators.required]),
      'answer1': new FormControl('', [Validators.required]),
      'answer2': new FormControl('', [Validators.required]),
      'answer3': new FormControl('', [Validators.required]),
      'answer4': new FormControl('', [Validators.required]),
      'answer5': new FormControl('', [Validators.required]),
      'answer6': new FormControl('', [Validators.required]),
      'answer7': new FormControl('', [Validators.required]),
      'answer8': new FormControl('', [Validators.required]),
      'answer9': new FormControl('', [Validators.required]),
      'answer10': new FormControl('', [Validators.required]),
      'answer11': new FormControl('', [Validators.required]),
      'answer12': new FormControl('', [Validators.required]),
      'answer13': new FormControl('', [Validators.required]),
      'answer14': new FormControl('', [Validators.required]),
      'answer15': new FormControl('', [Validators.required]),
      'answer16': new FormControl('', [Validators.required]),
      'answer17': new FormControl('', [Validators.required]),
      'answer18': new FormControl('', [Validators.required]),
      'answer19': new FormControl('', [Validators.required]),
      'answer20': new FormControl('', [Validators.required]),
      'answer21': new FormControl('', [Validators.required]),
      'answer22': new FormControl('', [Validators.required]),
      'answer23': new FormControl('', [Validators.required]),
      'answer24': new FormControl('', [Validators.required]),
      'answer25': new FormControl('', [Validators.required]),
      'answer26': new FormControl('', [Validators.required]),
      'answer27': new FormControl('', [Validators.required])
    });
  }


  public getAnswers(): void {
    this.userService.getAnswers().subscribe(
      {
        next: (response: Answer[]) =>
          this.answers = response,
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public getSurveys(): void {
    this.userService.getSurveys().subscribe({
        next: (response: Survey[]) => {
          this.surveys = response;
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public getQuestions(): void {
    this.userService.getQuestions().subscribe({
        next: (response: Question[]) => {
          this.questions = response;
        },
        error: (error) =>
          alert(error.message)
      }
    )
  }

  public createNewSurvey() {
    // @ts-ignore
    this.survey = new Survey(this.surveys.length, this.NewSurveyGeneralDetails.controls['surveyTitle'].value, localStorage.getItem('email'), this.NewSurveyGeneralDetails.controls['startDate'].value, this.NewSurveyGeneralDetails.controls['endDate'].value)
    this.userService.createNewSurvey(this.survey).subscribe({
      next: async (response: Survey) => {
        this.survey = response;
        let index = this.questions
          .map((question: { id: number; }) => {
            return question.id;
          })
          .sort((a, b) => b - a)[0] + 1;
        for (let i = 0; i < 10; i++) {
          this.question = new Question(index++, this.surveys.length, this.NewSurveyGeneralDetails.controls['question' + (i + 1)].value)
          await delay(100);
          this.userService.createNewQuestion(this.question).subscribe({
            next: (response: Question) => {
              if (i == 8) {
                this.questionsAreCompleted.next(true);
              }
              console.log(response)
            },
            error: () => alert("Something went wrong with questions")
          })
        }

      },
      error: () => alert("Something went wrong with surveys")
    });
  }


  public async createAnswersForQuestions(): Promise<void> {
    let index = this.answers
      .map((answer: { id: number; }) => {
        return answer.id;
      })
      .sort((a, b) => b - a)[0] + 1;
    let j = 0, questionId = this.questions
      .map((question: { id: number; }) => {
        return question.id;
      })
      .sort((a, b) => b - a)[0] + 1

    for (let i = 0; i < 27; i++) {
      if (i == j + 3) {
        questionId++;
        j = j + 3;
      }
      this.answer = new Answer(index++, questionId, this.NewSurveyGeneralDetails.controls['answer' + (i + 1)].value, 0);
      await delay(100);
      this.userService.createNewAnswer(this.answer).subscribe({
        next: async (response: Answer) => {
        },
        error: () => alert("Something went wrong with answers")
      });
    }
  }

}
