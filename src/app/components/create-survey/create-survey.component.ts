import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  public NewSurveyGeneralDetails: FormGroup | any;
  public valuesQuestions = [];
  constructor() { }

  get titleInput() { return this.NewSurveyGeneralDetails.get('surveyTitle'); }

  ngOnInit(): void {
    this.NewSurveyGeneralDetails = new FormGroup({
    'surveyTitle': new FormControl('', Validators.required ),
    'startDate': new FormControl('', [Validators.required]),
    'endDate': new FormControl('', [Validators.required]),
      'question' : new FormControl('',[Validators.required])
    });


  }

  public removeValueQuestion(i : number) {
    this.valuesQuestions.splice(i, 1);
  }

  public addValueQuestion() {
    const input = document.getElementById('question') as HTMLInputElement | null;
    const valueQuestion = input?.value;
    console.log(valueQuestion)
    // @ts-ignore
    this.valuesQuestions.push(valueQuestion);
  }

}
