import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserRegisterDto} from "../models/userRegisterDto.model";
import {Survey} from "../models/survey.model";
import {Question} from "../models/question.model";
import {Answer} from "../models/answer.model";

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



}
