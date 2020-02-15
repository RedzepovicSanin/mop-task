import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { Page404Component } from './page404/page404.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'pages', component: PagesComponent ,children: [
    { path: 'homepage', component: HomepageComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'myquestions', component: MyQuestionsComponent },
    { path: 'profile', component: ProfileComponent }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
