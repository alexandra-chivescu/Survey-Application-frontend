import {Optional} from "@angular/core";

export class UserAuthDto {
  public email : string;
  public password : string;
  public type : string;

  constructor( email: string, password: string, type: string) {
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
