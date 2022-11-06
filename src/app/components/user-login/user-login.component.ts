import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {sha256} from "js-sha256";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserLoginDto} from "../../models/userLoginDto.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public hide = true;
  public signInForm: FormGroup | any;
  public validInput: boolean = true;
  public user: UserLoginDto | undefined;
  public userService: UserService;
  public validCredentials = true;

  constructor(private router: Router,
              private usersService: UserService,
              private authService : AuthService) {
    this.userService = usersService;
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.min(3)])
    });

    if (localStorage.getItem('token') != '' && localStorage.getItem('email') != '' && localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate(['/home-user']);
    }
  }

  get emailInput() {
    return this.signInForm.get('email');
  }

  get passwordInput() {
    return this.signInForm.get('password');
  }

  public login(): void {

    if (this.signInForm.invalid) {
      this.validInput = false;
      return;
    } else {
      this.user = new UserLoginDto(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value)

      this.userService.login(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value).subscribe({
        next: (response: User[]) => {
          if(response.length === 0) {
            this.validCredentials = false;
          } else {
            this.authService.loginInit(this.signInForm.controls['email'].value);
          }
        },
        error: () => this.validCredentials = false
      });
    }
  }

  public pressLogin(event: { key: string; }) {
    if (event.key === 'Enter')
      this.login();
  }

}
