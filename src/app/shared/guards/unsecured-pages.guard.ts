import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class UnsecuredPagesGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){ }

  canActivate() {
    if (this.authService.isUserLoggedIn()) {
      window.alert("Already logged in. Click Sign Out button if you want to log in with different user!");
      this.router.navigate(['/pages/homepage']);
   }
   return true;
  }
}