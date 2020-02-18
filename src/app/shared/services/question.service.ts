import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // insert new question
  InsertQuestion(question: Question) {
    return this.http.post(environment.baseAddress + 'questions', question);
  }
  // paginated and sorted specific questions for feed
  GetQuestions(page, sortBy) {
    return this.http.get(environment.baseAddress + 
      'questions?_embed=answers&_embed=questionInfo&_sort=' + sortBy + '&_order=desc&_page=' + page + '&_limit=20');
  }
  // fetch question
  GetQuestion(questionId) {
    return this.http.get(environment.baseAddress + 
      'questions/' + questionId + '?_embed=answers&_embed=questionInfo&_embed=answerInfo');
  }

  // paginated questions for one user
  GetUserQuestions(userId, page) {
    return this.http.get(environment.baseAddress + 'questions?userId=' + userId + 
      '&_embed=questionInfo&_sort=id&_order=desc&_page=' + page + '&_limit=20');
  }

}
