import { AnswerInfo } from './answers-info';

export class Answer {
  message: string;
  likedByUser: boolean | null;
  user: string;
  id: number;
  questionId: number;
  userId: number;
  answerInfo: AnswerInfo[];
}