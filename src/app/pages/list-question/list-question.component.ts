import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { User } from 'src/app/shared/models/user';
import { QuestionInfoService } from 'src/app/shared/services/questionInfo.service';
import { QuestionInfo } from 'src/app/shared/models/question-info';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit {
  currentUser: User;
  @Input() questions: Question[] = [];
  constructor(private questionInfoService: QuestionInfoService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  // setting color for rating
  setRatingColor(rating: number): string {
    if (rating = 0) {
      return 'grey';
    } else if (rating > 0) {
      return 'green';
    } else if (rating < 0) {
      return 'red';
    }
  }
  // getting rating for question
  getRating(question: Question): number {
    let rating = 0;
    question.questionInfo.forEach(qI => {
      if (qI.like)
        rating += 1;
      else
        rating -= 1;
    })
    return rating;
  }

  // return color for img
  thisUserLikedQuestion(question: Question): string {
    const liked = this.thisUserLiked(question);
    if (liked == null) {
      return '';
    } else if (liked) {
      return '-green';
    }
  }
  // return color for img
  thisUserDislikedQuestion(question: Question): string {
    const liked = this.thisUserLiked(question);
    if (liked == null) {
      return '';
    } else if (!liked) {
      return '-red';
    }
  }
  // updating QI after like/dislike
  updateQuestionsInfo(question: Question, rating: string) {
    const liked = this.thisUserLiked(question);
    let questionInfo: QuestionInfo;
    if (liked !== null) {
      questionInfo = question.questionInfo.find((x: QuestionInfo) => x.userId === this.currentUser.id);
    }
    if (rating === 'liked') {
      if (liked == null) {
        this.questionInfoService.InsertQuestionInfo(this.setQuestionInfo(question, this.currentUser.id, true, undefined)).subscribe(() => {
          this.toastrService.success('Inserted like!', 'Success');
        });
      } else if (liked) {
        this.questionInfoService.DeleteQuestioninfo(questionInfo.id).subscribe(() => {
          this.toastrService.success('Deleted like!', 'Success');
        });
      } else if (!liked) {
        this.questionInfoService.UpdateQuestionInfo(this.setQuestionInfo(question, this.currentUser.id, true, questionInfo)).subscribe(() => {
          this.toastrService.success('Updated like!', 'Success');
        });
      }
    } else if (rating === 'disliked') {
      if (liked == null) {
        this.questionInfoService.InsertQuestionInfo(this.setQuestionInfo(question, this.currentUser.id, false, undefined)).subscribe(() => {
          this.toastrService.success('Inserted dislike!', 'Success');
        });
      } else if (liked) {
        this.questionInfoService.UpdateQuestionInfo(this.setQuestionInfo(question, this.currentUser.id, false, questionInfo)).subscribe(() => {
          this.toastrService.success('Updated dislike!', 'Success');
        });
      } else if (!liked) {
        this.questionInfoService.DeleteQuestioninfo(questionInfo.id).subscribe(() => {
          this.toastrService.success('Deleted dislike!', 'Success');
        });
      }
    }
  }
  // is this user liked question method
  thisUserLiked(question: Question): boolean | null {
    let liked = null;
    question.questionInfo.forEach(info => {
      if (this.currentUser.id === info.userId) {
        liked = info.like;
      }
    })
    return liked;
  }
  // setting QI for REST
  setQuestionInfo(question, userId, liked, questionInfo): QuestionInfo {
    const newQuestionInfo = new QuestionInfo;
    if (questionInfo)
      newQuestionInfo.id = questionInfo.id
    newQuestionInfo.userId = userId;
    newQuestionInfo.questionId = question.id;
    newQuestionInfo.like = liked;
    return newQuestionInfo;
  }
}
