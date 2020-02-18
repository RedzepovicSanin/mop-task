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
              private toastrService: ToastrService, private answerService: AnswerService) { }

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
    newQuestionObj.message = question.message;
    newQuestionObj.id = question.id;
    newQuestionObj.userId = question.userId;
    const questionInfo = question.questionInfo.find((x: QuestionInfo) => x.userId === this.currentUser.id);
    (questionInfo === undefined) ? newQuestionObj.likedByUser = null : newQuestionObj.likedByUser = questionInfo.like;
    newQuestionObj.answers = [];
    question.answers.forEach((answer: Answer) => {
      const newAnswersObj = new Answer;
      newAnswersObj.message = answer.message
      newAnswersObj.id = answer.id;
      newAnswersObj.userId = answer.userId;
      newAnswersObj.questionId = answer.questionId;
      const answerInfo = question.answerInfo.find((x: AnswerInfo) => (x.userId === this.currentUser.id) && (x.answerId === answer.id));
      (answerInfo === undefined) ? newAnswersObj.likedByUser = null : newAnswersObj.likedByUser = answerInfo.like;
      newQuestionObj.answers.push(newAnswersObj);
    })
    return newQuestionObj;
  }

  // return flag if user liked that question
  thisUserLiked(): boolean | null {
    let liked = null;
    this.question.questionInfo.forEach(info => {
      if (this.currentUser.id === info.userId) {
        liked = info.like;
      }
    })
    return liked;
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

  // if there is time
  editAnswer(answerId) {
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
