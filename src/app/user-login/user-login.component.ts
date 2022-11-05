import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {sha256} from "js-sha256";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserLoginDto} from "../../models/userLoginDto.model";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public hide = true;
  public signInForm: FormGroup | any;
  public validInput: boolean = true;
  public hashPassword: string | undefined;
  public user: UserLoginDto | undefined;
  public userService: UserService;
  public validCredentials = true;

  constructor(private router: Router,
              private usersService: UserService) {
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

  public generateRandomToken() {
    const rand = Math.random().toString(36).substring(2);
    return rand + rand;
  }

  public login(): void {

    if (this.signInForm.invalid) {
      this.validInput = false;
      return;
    } else {
      this.hashPassword = sha256(this.signInForm.controls['password'].value);
      //this.user = new UserAuthDto(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value, "user") //TODO: after testing the password will be replaced with this.hashPassword
      this.user = new UserLoginDto(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value)

      this.userService.login(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value).subscribe({
        next: (response: User[]) => {
          if(response.length === 0) {
            this.validCredentials = false;
          } else { localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('token', this.generateRandomToken());
            localStorage.setItem('email', this.signInForm.controls['email'].value);
            this.router.navigate(['/home-user']);
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
