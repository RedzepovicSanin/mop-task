import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { QuestionComponent } from './question/question.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomepageComponent,
    QuestionComponent,
    MyQuestionsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: []
})
export class PagesModule { }
