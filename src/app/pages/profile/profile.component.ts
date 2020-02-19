import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  profileForm: FormGroup;
  profilePasswordForm: FormGroup;
  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.profileForm = new FormGroup({
      'name': new FormControl(this.currentUser.name),
      'lastname': new FormControl(this.currentUser.lastname),
      'email': new FormControl(this.currentUser.email)
    });

    this.profilePasswordForm = new FormGroup({
      'oldPassword': new FormControl(''),
      'newPassword': new FormControl(''),
      'repeatNewPassword': new FormControl('')
    });
  }
  // updating profile method
  update() {
    const updateUser = new User;
    updateUser.name = this.name.value;
    updateUser.lastname = this.lastname.value;
    updateUser.email = this.email.value;
    updateUser.password = this.currentUser.password;
    updateUser.id = this.currentUser.id;
    this.userService.UpdateUser(updateUser).subscribe(() => {
      this.updateLocalUser(updateUser);
      this.toastrService.success('Profile updated!', 'Success');
    }, () => {
      this.toastrService.error('Profile not updated!', 'Error');
    })
  }
  // updating password method
  updatePassword() {
    if (this.currentUser.password !== btoa(this.oldPassword.value)) {
      this.toastrService.info('Old password wrong!', 'Info');
    } else {
      if (this.newPassword.value === this.repeatNewPassword.value) {
        const updateUser = new User;
        updateUser.name = this.currentUser.name;
        updateUser.lastname = this.currentUser.lastname;
        updateUser.email = this.currentUser.email;
        updateUser.password = btoa(this.newPassword.value);
        updateUser.id = this.currentUser.id;
        this.userService.UpdateUser(updateUser).subscribe(() => {
          this.updateLocalUser(updateUser);
          this.toastrService.success('Password updated!', 'Success');
        }, () => {
          this.toastrService.error('Password not updated!', 'Error');
        })
      } else {
        this.toastrService.info('Repeated password and new password are not same!', 'Info')
      }
    }
  }
  // update current user in local storage
  updateLocalUser(updateUser) {
    const userForUpdate = JSON.stringify(updateUser);
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', userForUpdate);
  }
  // reset validation after exiting validation window
  closeValidationInfo(inputValidation: AbstractControl) {
    inputValidation.markAsUntouched();
    inputValidation.markAsPristine();
  }
  // getters
  get name() { return this.profileForm.get('name') }
  get lastname() { return this.profileForm.get('lastname') }
  get email() { return this.profileForm.get('email') }

  get oldPassword() { return this.profilePasswordForm.get('oldPassword') }
  get newPassword() { return this.profilePasswordForm.get('newPassword') }
  get repeatNewPassword() { return this.profilePasswordForm.get('repeatNewPassword') }
}
