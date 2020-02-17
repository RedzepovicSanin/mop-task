import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {
  user: User;
  @Input() questions: Question[] = [];
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  // return rating for question
  getRating(question: Question): number {
    let rating = 0;
    question.questionInfo.forEach(info => {
      rating += info.rating;
    });
    return (rating === 0) ? rating : rating/question.questionInfo.length;
  }

  // return flag if user liked that question
  thisUserLiked(question: Question): boolean {
    let liked = null;
    question.questionInfo.forEach(info => {
      if (this.user.id === info.userId) {
        liked = info.like;
      }
    })
    return liked;
  }
}
