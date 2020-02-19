import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  // insert answer
  InsertAnswer(answer: Answer) {
    return this.http.post(environment.baseAddress + 'answers', answer);
  }
  
  // delete answer
  DeleteAnswer(answerId) {
    return this.http.delete(environment.baseAddress + 'answers/' + answerId);
  }

}
