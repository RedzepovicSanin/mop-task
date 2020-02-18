import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/shared/models/user';
import { Question } from 'src/app/shared/models/question';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
  currentUser: User;
  page = 1;
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questionsObservable = this.questionsSubject.asObservable();
  myQuestions: Question[];

  constructor(private questionService: QuestionService, private userService: UserService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.questionService.GetUserQuestions(this.currentUser.id, this.page).subscribe((response: Question[]) => {
      this.myQuestions = response;
      this.questionsSubject.next(this.myQuestions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  // load more questions
  loadMore() {
    this.page += this.page;
    this.questionService.GetUserQuestions(this.currentUser.id, this.page).subscribe((response: Question[]) => {
      this.myQuestions = this.myQuestions.concat(response);
      this.questionsSubject.next(this.myQuestions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }
}
