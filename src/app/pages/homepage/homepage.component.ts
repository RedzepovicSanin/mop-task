import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from 'src/app/shared/models/question';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  questions: Question[];

  constructor(private questionService: QuestionService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.questionService.GetQuestions().subscribe((response: Question[]) => {
      this.questions = response;
    }, () => {
      this.toastrService.error('Something went wrong!', 'Error');
    });
  }


}
