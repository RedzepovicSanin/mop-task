import { Answer } from './answer';
import { QuestionInfo } from './question-info';
import { AnswerInfo } from './answers-info';

export class Question {
  message: string;
  userId: number;
  user: string;
  id: number;
  likedByUser: boolean | null;
  answers: Answer[];
  questionInfo: QuestionInfo[];
  answerInfo: AnswerInfo[];
}