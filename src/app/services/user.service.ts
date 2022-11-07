import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserRegisterDto} from "../models/userRegisterDto.model";
import {Survey} from "../models/survey.model";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";
import {CompletedSurveyDto} from "../models/completedSurveyDto.model";
import {CompletedSurvey} from "../models/completedSurvey.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public register(user: UserRegisterDto) : Observable<User>{
    return this.http.post<User>("http://localhost:3000/Users", user);
  }

  public login(userEmail : string, userPassword : string) {
    return this.http.get<User[]>("http://localhost:3000/Users?email=" + userEmail + "&password=" + userPassword);
  }

  public getUserByEmail(userEmail : string) {
    return this.http.get<User[]>("http://localhost:3000/Users?email=" + userEmail);
  }

  public getSurveys() : Observable<Survey[]> {
    return this.http.get<Survey[]>("http://localhost:3000/Surveys");
  }

  public getSurveyById(surveyId : number) : Observable<Survey[]> {
    return this.http.get<Survey[]>("http://localhost:3000/Surveys?id=" + surveyId);
  }


  public getQuestions(survey_id : number) : Observable<Question[]> {
    return this.http.get<Question[]>("http://localhost:3000/Questions?survey_id="+survey_id);
  }

  public getAnswers() : Observable<Answer[]> {
    return this.http.get<Answer[]>("http://localhost:3000/Answers");
  }

  public modifyAnswer(modifiedAnswer : Answer) : Observable<Answer> {
    return this.http.put<Answer>("http://localhost:3000/Answers/" + modifiedAnswer.id, modifiedAnswer);
  }

  public completedSurvey(completedSurvey: CompletedSurveyDto) : Observable<CompletedSurveyDto> {
    return this.http.post<CompletedSurveyDto>("http://localhost:3000/CompletedSurvey", completedSurvey);
  }

  public getCompletedSurveys() : Observable<CompletedSurvey[]> {
    return this.http.get<CompletedSurvey[]>("http://localhost:3000/CompletedSurvey");
  }

}
