import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // login user method
  Login(user: User) {
    return this.http.get(environment.baseAddress + 'users?email=' + user.email);
  }

  // register user method
  InsertUser(user: User) {
    return this.http.post(environment.baseAddress + 'users', user);
  }
}
