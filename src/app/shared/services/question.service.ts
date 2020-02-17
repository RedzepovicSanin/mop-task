import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Question } from '../../shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // questions
  GetQuestions(page) {
    return this.http.get(environment.baseAddress + 
      'questions?_embed=answers&_embed=questionInfo&_sort=id&_order=desc&_page=' + page + '&_limit=20' );
  }

  // questions for specific user
  GetUserQuestions(userId, page) {
    return this.http.get(environment.baseAddress + 'questions?userId=' + userId + 
      '&_embed=answers&_embed=questionInfo&_sort=id&_order=desc&_page=' + page + '&_limit=20');
  }
}
