import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class SecuredPagesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.isUserLoggedIn()) {
      window.alert('You need to log in first!');
      this.router.navigate(['/login']);
    }
    return true;
  }

}