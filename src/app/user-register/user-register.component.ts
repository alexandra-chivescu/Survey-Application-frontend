import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {sha256} from "js-sha256";
import {User} from "../../models/user.model";
import {UserRegisterDto} from "../../models/userRegisterDto.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public hide = true;
  public signInForm: FormGroup | any ;
  public validInput : boolean = true;
  public hashPassword: string | undefined;
  public user: UserRegisterDto | undefined;
  public userService: UserService;
  public checkedUserType = true;
  public validCredentials = true;

  constructor(private router : Router,
              private usersService : UserService,
              private snackBar : MatSnackBar) {
    this.userService = usersService;
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email] ),
      'password': new FormControl('', [Validators.required, Validators.min(3) ]),
      'type': new FormControl('', Validators.required)
    });

    if(localStorage.getItem('token') != '' && localStorage.getItem('email') != '' && localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/home-user']);
    }
  }

  get emailInput() { return this.signInForm.get('email'); }
  get passwordInput() { return this.signInForm.get('password'); }

  public generateRandomToken() {
    const rand = Math.random().toString(36).substring(2);
    return rand + rand;
  }

  public register() : void {

    if (this.signInForm.invalid) {
      if(this.signInForm.controls['type'].value != "user" && this.signInForm.controls['type'].value != "creator") {
        this.checkedUserType = false;
      } else {
        this.checkedUserType = true;
      }
      this.validInput = false;
      return;
    } else {
      this.hashPassword = sha256(this.signInForm.controls['password'].value);
      //this.user = new UserAuthDto(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value, "user") //TODO: after testing the second parameter will be replaced with this.hashPassword
      this.user = new UserRegisterDto( this.signInForm.controls['email'].value, this.signInForm.controls['password'].value, this.signInForm.controls['type'].value)

      this.userService.register(this.user).subscribe( {
        next: (response:User) => {
          this.user = response;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.generateRandomToken());
          this.router.navigate(['/home-user']);
          this.snackBar.open('Successfully created a new account', "OK", {duration: 2000})
        },
        error : () => this.validCredentials = false
      });
    }
  }

  public pressLogin(event: { key: string; }) {
    if(event.key === 'Enter')
      this.register();
  }

}
