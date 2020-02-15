import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Question } from '../../shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // login user method
  GetQuestions() {
    return this.http.get(environment.baseAddress + 'questions?_sort=id&_order=desc');
  }
}
