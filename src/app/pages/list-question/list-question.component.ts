import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {
  currentUser: User;
  @Input() questions: Question[] = [];
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // return flag if user liked that question
  thisUserLiked(question: Question): boolean | null {
    let liked = null;
    question.questionInfo.forEach(info => {
      if (this.currentUser.id === info.userId) {
        liked = info.like;
      }
    })
    return liked;
  }
}
