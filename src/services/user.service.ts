import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserAuthDto} from "../models/userAuthDto.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public login(user: UserAuthDto) : Observable<User>{
    return this.http.post<User>("http://localhost:3000/Users", user);
  }

}
