import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { QuestionInfo } from 'src/app/shared/models/question-info';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerInfo } from 'src/app/shared/models/answers-info';
import { AnswerService } from 'src/app/shared/services/answer.service';
import { BehaviorSubject } from 'rxjs';
import { QuestionInfoService } from 'src/app/shared/services/questionInfo.service';
import { AnswerInfoService } from 'src/app/shared/services/answerInfo.service';

@Component({
  selector: 'app-questions',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  currentUser: User;
  questionId: number;
  message: string;
  private questionSubject = new BehaviorSubject<Question>(new Question);
  questionsObservable = this.questionSubject.asObservable();
  question: Question;
  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService,
              private toastrService: ToastrService, private answerService: AnswerService,
              private questionInfoService: QuestionInfoService, private answerInfoService: AnswerInfoService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.questionId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.questionService.GetQuestion(this.questionId).subscribe((response: Question) => {
      this.question = this.setQuestionObj(response);
      this.questionSubject.next(this.question);
    }, () => {
      this.toastrService.error('Something went bad!', 'Error');
    });
  }

  // set object for manipulation
  setQuestionObj(question: Question): Question {
    const newQuestionObj = new Question;
    newQuestionObj.user = question.user;
    newQuestionObj.message = question.message;
    newQuestionObj.id = question.id;
    newQuestionObj.userId = question.userId;
    const questionInfo = question.questionInfo.find((x: QuestionInfo) => x.userId === this.currentUser.id);
    (questionInfo === undefined) ? newQuestionObj.likedByUser = null : newQuestionObj.likedByUser = questionInfo.like;
    newQuestionObj.questionInfo = question.questionInfo;
    newQuestionObj.answerInfo = question.answerInfo;
    newQuestionObj.answers = [];
    question.answers.forEach((answer: Answer) => {
      const newAnswersObj = new Answer;
      newAnswersObj.message = answer.message
      newAnswersObj.user = answer.user;
      newAnswersObj.id = answer.id;
      newAnswersObj.userId = answer.userId;
      newAnswersObj.questionId = answer.questionId;
      const answerInfo = newQuestionObj.answerInfo.find((x: AnswerInfo) => (x.userId === this.currentUser.id) && (x.answerId === answer.id));
      (answerInfo === undefined) ? newAnswersObj.likedByUser = null : newAnswersObj.likedByUser = answerInfo.like;
      newAnswersObj.answerInfo = newQuestionObj.answerInfo;
      newQuestionObj.answers.push(newAnswersObj);
    })
    return newQuestionObj;
  }

  setRatingColor(rating: number): string {
    if (rating = 0) {
      return 'grey';
    } else if (rating > 0) {
      return 'green';
    } else if (rating < 0) {
      return 'red';
    }
  }

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

  // return flag if user liked that question
  thisUserLikedQuestion(question: Question): string {
    const liked = this.thisUserLiked(question);
    if (liked == null) {
      return '';
    } else if (liked) {
      return '-green';
    }
  }

  thisUserDislikedQuestion(question: Question): string {
    const liked = this.thisUserLiked(question);
    if (liked == null) {
      return '';
    } else if (!liked) {
      return '-red';
    }
  }

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

  thisUserLiked(question: Question): boolean | null {
    let liked = null;
    question.questionInfo.forEach(info => {
      if (this.currentUser.id === info.userId) {
        liked = info.like;
      }
    })
    return liked;
  }

  setQuestionInfo(question, userId, liked, questionInfo): QuestionInfo {
    const newQuestionInfo = new QuestionInfo;
    if (questionInfo)
      newQuestionInfo.id = questionInfo.id
    newQuestionInfo.userId = userId;
    newQuestionInfo.questionId = question.id;
    newQuestionInfo.like = liked;
    return newQuestionInfo;
  }

  getRatingA(answer: Answer): number {
    let rating = 0;
    answer.answerInfo.forEach(qI => {
      if (qI.like && qI.answerId === answer.id)
        rating += 1;
      else if (qI.answerId === answer.id)
        rating -= 1;
    })
    return rating;
  }

  // return flag if user liked that question
  thisUserLikedAnswer(answer: Answer): string {
    const liked = this.thisUserLikedA(answer);
    if (liked == null) {
      return '';
    } else if (liked) {
      return '-green';
    }
  }

  thisUserDislikedAnswer(answer: Answer): string {
    const liked = this.thisUserLikedA(answer);
    if (liked == null) {
      return '';
    } else if (!liked) {
      return '-red';
    }
  }

  updateAnswersInfo(answer: Answer, rating: string) {
    const liked = this.thisUserLikedA(answer);
    let answerInfo: AnswerInfo;
    if (liked !== null) {
      answerInfo = answer.answerInfo.find((x: AnswerInfo) => x.userId === this.currentUser.id);
    }
    if (rating === 'liked') {
      if (liked == null) {
        this.answerInfoService.InsertAnswerInfo(this.setAnswerInfo(answer, this.currentUser.id, true, undefined)).subscribe(() => {
          this.toastrService.success('Inserted answer like!', 'Success');
        });
      } else if (liked) {
        this.answerInfoService.DeleteAnswerinfo(answerInfo.id).subscribe(() => {
          this.toastrService.success('Deleted answer like!', 'Success');
        });
      } else if (!liked) {
        this.answerInfoService.UpdateAnswerInfo(this.setAnswerInfo(answer, this.currentUser.id, true, answerInfo)).subscribe(() => {
          this.toastrService.success('Updated answer like!', 'Success');
        });
      }
    } else if (rating === 'disliked') {
      if (liked == null) {
        this.answerInfoService.InsertAnswerInfo(this.setAnswerInfo(answer, this.currentUser.id, false, undefined)).subscribe(() => {
          this.toastrService.success('Inserted answer dislike!', 'Success');
        });
      } else if (liked) {
        this.answerInfoService.UpdateAnswerInfo(this.setAnswerInfo(answer, this.currentUser.id, false, answerInfo)).subscribe(() => {
          this.toastrService.success('Updated answer dislike!', 'Success');
        });
      } else if (!liked) {
        this.answerInfoService.DeleteAnswerinfo(answerInfo.id).subscribe(() => {
          this.toastrService.success('Deleted answer dislike!', 'Success');
        });
      }
    }
  }

  thisUserLikedA(answer: Answer): boolean | null {
    let liked = null;
    answer.answerInfo.forEach(info => {
      if (this.currentUser.id === info.userId && info.answerId === answer.id) {
        liked = info.like;
      }
    })
    return liked;
  }

  setAnswerInfo(answer, userId, liked, answerInfo): AnswerInfo {
    const newAnswerInfo = new AnswerInfo;
    if (answerInfo)
      newAnswerInfo.id = answerInfo.id
    newAnswerInfo.userId = userId;
    newAnswerInfo.answerId = answer.id;
    newAnswerInfo.questionId = answer.questionId;
    newAnswerInfo.like = liked;
    return newAnswerInfo;
  }



  // creates answer and refreshes data
  createAnswer(message, question) {
    const newAnswer = new Answer;
    newAnswer.message = message;
    newAnswer.questionId = question.id;
    newAnswer.userId = this.currentUser.id;
    this.answerService.InsertAnswer(newAnswer).subscribe((response: Answer) => {
      this.message = "";
      this.question.answers.push(response);
      this.questionSubject.next(this.question);
      if (this.currentUser.id === question.id)
        this.toastrService.info('Your question got another answer!', 'Info');
      this.toastrService.success('Added comment', 'Success');
    }, () => {
      this.toastrService.error('Something went bad!', 'Error');
    })
  }

  // deletes answer and refreshes data
  deleteAnswer(answerId) {
    this.answerService.DeleteAnswer(answerId).subscribe((response: Answer) => {
      this.question.answers = this.question.answers.filter(answer => answer.id !== answerId);
      this.questionSubject.next(this.question);
      this.toastrService.success('Your answer was deleted!', 'Info');
    }, () => {
      this.toastrService.error('Something went bad!', 'Error');
    })
  }
}
