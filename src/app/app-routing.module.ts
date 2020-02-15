import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { Page404Component } from './page404/page404.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { QuestionComponent } from './pages/question/question.component';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PagesComponent } from './pages/pages.component';

import { SecuredPagesGuard } from './shared/guards/secured-pages.guard';
import { UnsecuredPagesGuard } from './shared/guards/unsecured-pages.guard';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [UnsecuredPagesGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [UnsecuredPagesGuard] },
  { path: 'pages', component: PagesComponent, children: [
    { path: 'homepage', component: HomepageComponent, canActivate: [SecuredPagesGuard] },
    { path: 'question/:id', component: QuestionComponent, canActivate: [SecuredPagesGuard] },
    { path: 'myquestions', component: MyQuestionsComponent, canActivate: [SecuredPagesGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [SecuredPagesGuard] },
    { path: '', redirectTo: 'homepage', pathMatch: 'prefix' }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [SecuredPagesGuard, UnsecuredPagesGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
