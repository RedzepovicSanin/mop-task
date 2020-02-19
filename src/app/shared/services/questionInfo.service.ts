import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuestionInfo } from '../models/question-info';

@Injectable({
  providedIn: 'root'
})
export class QuestionInfoService {

  constructor(private http: HttpClient) { }

  // insert new question info
  InsertQuestionInfo(questionInfo: QuestionInfo) {
    return this.http.post(environment.baseAddress + 'questionInfo', questionInfo);
  }
  // update question info
  UpdateQuestionInfo(questionInfo: QuestionInfo) {
    return this.http.put(environment.baseAddress + 'questionInfo/' + questionInfo.id, questionInfo);
  }

  // delete question info
  DeleteQuestioninfo(questionId: number) {
    return this.http.delete(environment.baseAddress + 'questionInfo/' + questionId);
  }

}
