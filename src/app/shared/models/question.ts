import { Answer } from './answer';

export class Question {
  message: string;
  userId: number;
  id: number;
  answers: Answer[];
}