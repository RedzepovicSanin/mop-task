import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlContainer, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private userService: UserService, private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'password': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
    });
    this.loginFailed = false;
  }

  login() {
    this.loginFailed = false;
    const userForLogin = new User;
    userForLogin.email = this.email.value;
    userForLogin.password = btoa(this.password.value);
    this.userService.Login(userForLogin).subscribe((response: User[]) => {
      const returnedUser = response[0];
      if (userForLogin.password === returnedUser.password) {
        this.router.navigate(['/homepage']);
      } else {
        this.loginFailed = true;
      }
    }, () => {
      this.toastrService.error('Something bad happened!','Error');
      this.loginFailed = true;
    });
  }

  closeValidationInfo(inputValidation: AbstractControl) {
    inputValidation.markAsUntouched();
    inputValidation.markAsPristine();
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
