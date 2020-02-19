import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}
  // insert to local storage
  insertUserToStorage(user: User) {
    const userForInsert = JSON.stringify(user);
    localStorage.setItem('currentUser', userForInsert);
  }
  // remove from local storage
  removeUserFromStorage() {
    localStorage.removeItem('currentUser');
  }

  // checks if user is logged in
  isUserLoggedIn(): boolean {
    const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    return (loggedUser !== null) ? true : false;
  }
}