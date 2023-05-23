import { ISlide } from '../slide';

export interface ILesson {
  id: string;
  courseId: string;
  name: string;
  description: string;
  order: number;
}

export interface ILessonUpdateOrder {
  id: string;
  order: number;
}
