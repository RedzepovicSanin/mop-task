import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { QuestionTypes } from 'src/app/shared/enums/question-types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  user: User;
  page = 1;
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questionsObservable = this.questionsSubject.asObservable();
  questions: Question[] = [];
  questionTypes = QuestionTypes;

  constructor(private questionService: QuestionService, private userService: UserService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.questionService.GetQuestions(this.page).subscribe((response: Question[]) => {
      this.questions = response;
      this.questionsSubject.next(this.questions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  // load more questions
  loadMore() {
    this.page += this.page;
    this.questionService.GetQuestions(this.page).subscribe((response: Question[]) => {
      this.questions = this.questions.concat(response);
      this.questionsSubject.next(this.questions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  getQuestions(event) {
    debugger;
    const a = 5;
  }

  getLatestQuestions() {}
  getMostViewedQuestions() {}
  getHotQuestions() {}
}
