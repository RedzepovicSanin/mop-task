import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  currentUser: User;
  page: number;
  currentFeed: number;
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questionsObservable = this.questionsSubject.asObservable();
  questions: Question[] = [];
  message: string;

  constructor(private questionService: QuestionService, private userService: UserService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getLatestQuestions(false);
  }

  createQuestion(message: string) {
    const newQuestion = new Question;
    newQuestion.message = message;
    newQuestion.userId = this.currentUser.id;
    this.questionService.InsertQuestion(newQuestion).subscribe((response: Question) => {
      this.toastrService.success('Added new question!', 'Success');
      this.getLatestQuestions(false);
      this.message = "";
    }, () => {
      this.toastrService.error('Something went bad!', 'Error');
    })
  }

  getLatestQuestions(isLoadMoreFunc: boolean, page = 1) {
    if (!isLoadMoreFunc)
      this.questions = [];
    this.page = page;
    this.currentFeed = 1;
    this.questionService.GetQuestions(page, 'id').subscribe((response: Question[]) => {
      this.questions = this.questions.concat(response);
      this.questionsSubject.next(this.questions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  getMostViewedQuestions(isLoadMoreFunc: boolean, page = 1) {
    if (!isLoadMoreFunc)
      this.questions = [];
    this.page = page;
    this.currentFeed = 2;
    this.questionService.GetQuestions(page, 'answers').subscribe((response: Question[]) => {
      this.questions = this.questions.concat(response).sort((x,y) => y.answers.length - x.answers.length);
      this.questionsSubject.next(this.questions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  getHotQuestions(isLoadMoreFunc: boolean, page = 1) {
    if (!isLoadMoreFunc)
      this.questions = [];
    this.page = page;
    this.currentFeed = 3;
    this.questionService.GetQuestions(page, 'questionInfo').subscribe((response: Question[]) => {
      this.questions = this.questions.concat(response).sort((x,y) => y.questionInfo.length - x.questionInfo.length);
      this.questionsSubject.next(this.questions);
    }, () => {
      this.toastrService.error('Something bad happened!', 'Error');
    });
  }

  // load more questions
  loadMore(currentFeed) {
    this.page += this.page;
    switch (currentFeed) {
      case 1:
        this.getLatestQuestions(true, this.page);
        break;
      case 2:
        this.getMostViewedQuestions(true, this.page);
        break;
      case 3:
        this.getHotQuestions(true, this.page);
        break;
      default:
        break;
    }
  }
}
