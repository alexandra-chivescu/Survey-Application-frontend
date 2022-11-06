import {Optional} from "@angular/core";

export class User {
  public user_id : number;
  public email : string;
  public password : string;
  public type : string;

  constructor(user_id: number, email: string, password: string, type: string) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
