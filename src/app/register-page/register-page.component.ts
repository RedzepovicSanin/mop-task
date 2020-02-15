import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
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
      'lastName': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'email': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
      'password': new FormControl('', { validators: [Validators.required], updateOn: 'blur'}),
    });
    this.registerFailed = false;
  }

  register() {
    const userForInsert = new User;
    userForInsert.name = this.name.value;
    userForInsert.lastName = this.lastName.value;
    userForInsert.email = this.email.value;
    userForInsert.password = btoa(this.password.value);
    this.userService.InsertUser(userForInsert).subscribe((response) => {
      this.toastrService.success('User added!', 'Success');
      this.router.navigate(['/login']);
    }, () => {
      this.toastrService.error('User not added!', 'Error');
    });
  }

  closeValidationInfo(inputValidation: AbstractControl) {
    inputValidation.markAsUntouched();
    inputValidation.markAsPristine();
  }

  get name() { return this.registerForm.get('name') }
  get lastName() { return this.registerForm.get('lastName') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
}
