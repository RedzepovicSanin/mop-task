import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  // login user method
  GetUser(user: User) {
    return this.http.get(environment.baseAddress + 'users?email=' + user.email);
  }

  // register user method
  InsertUser(user: User) {
    return this.http.post(environment.baseAddress + 'users', user);
  }

  // update user method
  UpdateUser(user: User) {
    return this.http.put(environment.baseAddress + 'users/' + user.id, user);
  }
}
