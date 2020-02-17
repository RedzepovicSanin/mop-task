import { Answer } from './answer';
import { QuestionInfo } from './question-info';

export class Question {
  message: string;
  userId: number;
  id: number;
  answers: Answer[];
  questionInfo: QuestionInfo[];
}