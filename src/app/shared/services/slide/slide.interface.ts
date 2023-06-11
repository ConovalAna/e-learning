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
  statisticsLabel: string;
  correctAnswers: string[];
}

export interface IPracticeSlide {
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

export function dbTestSlideToITestSlide(dbTestSlide: any): ITestSlide {
  return {
    id: dbTestSlide.Id,
    type: dbTestSlide.Type,
    delta: '',
    statisticsLabel: dbTestSlide.StatisticsLabel,
    order: dbTestSlide.Order,
    answerType: dbTestSlide.AnswerType,
    answers: dbTestSlide.Answers,
    correctAnswers: dbTestSlide.CorrectAnswers,
  };
}

export interface IGroupedSlideStatistic {
  answersCount: any;
  number: number;
  testId: string;
}
