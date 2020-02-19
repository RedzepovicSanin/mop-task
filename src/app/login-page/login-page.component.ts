import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.authService.removeUserFromStorage();
    this.loginForm = new FormGroup({
      'email': new FormControl('', { validators: [Validators.required] }),
      'password': new FormControl('', { validators: [Validators.required] }),
    });
    this.loginFailed = false;
  }
  // login method
  login() {
    this.loginFailed = false;
    if (!this.loginForm.valid) {
      this.loginFailed = true;
    }
    else {
      const userForLogin = new User;
      userForLogin.email = this.email.value;
      userForLogin.password = btoa(this.password.value);
      this.userService.CheckUser(userForLogin).subscribe((response: User[]) => {
        const returnedUser = response[0];
        if (returnedUser === undefined) {
          this.loginFailed = true;
        } else {
          if ((returnedUser.email === userForLogin.email) && (userForLogin.password === returnedUser.password)) {
            this.authService.insertUserToStorage(returnedUser);
            this.router.navigate(['/pages/homepage']);
          } else {
            this.loginFailed = true;
          }
        }
      }, () => {
        this.toastrService.error('Something bad happened!','Error');
        this.loginFailed = true;
      });
    }
  }
  // reset validation after exiting validation window
  closeValidationInfo(inputValidation: AbstractControl) {
    inputValidation.markAsUntouched();
    inputValidation.markAsPristine();
  }
  // reset div
  reset() {
    this.loginFailed = false;
  }
  // getters
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
