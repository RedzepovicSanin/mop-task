import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { Page404Component } from './page404/page404.component';

import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { QuestionService } from './shared/services/question.service';
import { AnswerService } from './shared/services/answer.service';
import { QuestionInfoService } from './shared/services/questionInfo.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    PagesModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    AuthService,
    QuestionService,
    AnswerService,
    QuestionInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
