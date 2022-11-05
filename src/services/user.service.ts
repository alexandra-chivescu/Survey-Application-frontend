import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserRegisterDto} from "../models/userRegisterDto.model";

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

}
