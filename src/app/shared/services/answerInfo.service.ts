import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnswerInfo } from '../models/answers-info';

@Injectable({
  providedIn: 'root'
})
export class AnswerInfoService {

  constructor(private http: HttpClient) { }

  // insert new answer info
  InsertAnswerInfo(answerInfo: AnswerInfo) {
    return this.http.post(environment.baseAddress + 'answerInfo', answerInfo);
  }
  // update answer info
  UpdateAnswerInfo(answerInfo: AnswerInfo) {
    return this.http.put(environment.baseAddress + 'answerInfo/' + answerInfo.id, answerInfo);
  }

  // delete answer info
  DeleteAnswerinfo(answerId: number) {
    return this.http.delete(environment.baseAddress + 'answerInfo/' + answerId);
  }

}
