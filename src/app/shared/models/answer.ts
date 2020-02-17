import { AnswerInfo } from './answers-info';

export class Answer {
  message: string;
  questionId: number;
  userId: number;
  answerInfo: AnswerInfo[];
}