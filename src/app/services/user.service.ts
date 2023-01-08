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
    return this.http.post<User>("/Home/register", user);
  }

  public login(userEmail : string, userPassword : string) {
    return this.http.get<User[]>("/Home/login?email=" + userEmail + "&password=" + userPassword);
  }

  public getUserByEmail(userEmail : string) {
    return this.http.get<User[]>("/Home?email=" + userEmail);
  }

  public getSurveys() : Observable<Survey[]> {
    return this.http.get<Survey[]>("/Home/Surveys");
  }

  public getSurveyById(surveyId : number) : Observable<Survey[]> {
    return this.http.get<Survey[]>("/Home/Surveys?id=" + surveyId);
  }


  public getQuestionsBySurveyId(survey_id : number) : Observable<Question[]> {
    return this.http.get<Question[]>("/Home/Questions?survey_id="+survey_id);
  }

  public getQuestions() : Observable<Question[]> {
    return this.http.get<Question[]>("/Home/Questions");
  }

  public getAnswers() : Observable<Answer[]> {
    return this.http.get<Answer[]>("/Home/Answers");
  }

  public getAnswersByQuestionId(questionId : number) : Observable<Answer[]> {
    return this.http.get<Answer[]>("/Home/Answers?question_id="+questionId);
  }

  public modifyAnswer(modifiedAnswer : Answer) : Observable<Answer> {
    return this.http.put<Answer>("/Home/Answers/", modifiedAnswer);
  }

  public completedSurvey(completedSurvey: CompletedSurveyDto) : Observable<CompletedSurveyDto> {
    return this.http.post<CompletedSurveyDto>("/Home/CompletedSurvey", completedSurvey);
  }

  public getCompletedSurveyByUserIdAndSurveyId(userId : number, surveyId : number) : Observable<CompletedSurvey[]> {
    return this.http.get<CompletedSurvey[]>("/Home/CompletedSurvey?survey_id="+surveyId+"&user_id="+userId);
  }

  public changeEndDateForSurvey(updatedSurvey : Survey) : Observable<Survey> {
    return this.http.put<Survey>("/Home/Surveys/", updatedSurvey);
  }

  public createNewSurvey(survey: Survey) : Observable<Survey>{
    return this.http.post<Survey>("/Home/Surveys", survey);
  }

  public createNewQuestion(question: Question) : Observable<Question>{
    return this.http.post<Question>("/Home/Questions", question);
  }

  public createNewAnswer(answer: Answer) : Observable<Answer>{
    return this.http.post<Answer>("Home/Answers", answer);
  }


}
