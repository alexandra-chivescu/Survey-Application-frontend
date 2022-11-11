import {Component, Inject, OnInit} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {Question} from "../../models/question.model";
import {Answer} from "../../models/answer.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-results-survey',
  templateUrl: './results-survey.component.html',
  styleUrls: ['./results-survey.component.css']
})
export class ResultsSurveyComponent implements OnInit {

  questions: Question[] = [];
  answersForQuestions: Map<Question, Answer[]> = new Map<Question, Answer[]>();
  pageLoadedSubject: Subject<any> = new Subject<any>();
  isPageLoaded = false;
  allAnswers: Answer[] = [];

  constructor(private dialogRef: DialogRef,
              private questionService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: {
                id: number,
                title: string,
                creator: string,
                start_date: Date,
                end_date: Date
              }) {
  }

  ngOnInit(): void {
    this.pageLoadedSubject
      .subscribe(value => {
        this.isPageLoaded = true
      });

    this.questionService.getQuestionsBySurveyId(this.data.id)
      .subscribe(value => {

        this.questions = value
        for (let i = 0; i < this.questions.length; i++) {
          this.questionService.getAnswersByQuestionId(value[i].id)
            .subscribe(answers => {
              this.answersForQuestions.set(value[i], answers)
              for (let j = 0; j < answers.length; j++) {
                this.allAnswers.push(answers[j]);
              }
              if (i == this.questions.length - 1) {
                this.pageLoadedSubject.next(true);
              }
            });
        }
      });
  }

  public closeDialog() {
    this.dialogRef.close(false);
  }

  generateAnswers(answer: Answer): string {
    let allVotesPerAnswer = this.allAnswers
      .filter(currentAnswer => currentAnswer.question_id === answer.question_id)
      .map(value => value.noResponses)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    allVotesPerAnswer = allVotesPerAnswer === 0 ? 1 : allVotesPerAnswer;
    return answer.answer + " -> " + answer.noResponses + " responses (" + (answer.noResponses/allVotesPerAnswer * 100) + "% )";
  }
}
