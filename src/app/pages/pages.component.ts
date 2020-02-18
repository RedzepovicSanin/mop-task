import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements  OnInit {
  currentUser: User;

  constructor(private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this.authService.removeUserFromStorage();
    this.router.navigate(['/login']);
  }
}
