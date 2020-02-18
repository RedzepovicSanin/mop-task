import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  registerFailed: boolean;

  constructor(private userService: UserService, private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'lastname': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'email': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'password': new FormControl('', { validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}),
    });
    this.registerFailed = false;
  }

  register() {
    const a = this.registerForm.valid;

    this.registerFailed = false;
    const userForInsert = new User;
    userForInsert.name = this.name.value;
    userForInsert.lastname = this.lastname.value;
    userForInsert.email = this.email.value;
    userForInsert.password = btoa(this.password.value);
    this.userService.InsertUser(userForInsert).subscribe(() => {
      this.toastrService.success('Registration successful!', 'Success');
      this.router.navigate(['/login']);
    }, () => {
      this.toastrService.error('Registration not successful!', 'Error');
    });
  }

  closeValidationInfo(inputValidation: AbstractControl) {
    inputValidation.markAsUntouched();
    inputValidation.markAsPristine();
  }

  get name() { return this.registerForm.get('name') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
}
