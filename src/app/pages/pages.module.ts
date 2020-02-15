import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { QuestionsComponent } from './questions/questions.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomepageComponent,
    QuestionsComponent,
    MyQuestionsComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule
  ],
  providers: []
})
export class PagesModule { }
