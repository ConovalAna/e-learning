export interface ISlide {
  id: string;
  type: string;
  delta: string;
  order: number;
}

export interface ITestSlide {
  id: string;
  type: string;
  delta: string;
  order: number;
  answerType: AnswerType;
  answers: string[];
  correctAnswers: string[];
}

export enum AnswerType {
  One,
  Multi,
  Input,
}
