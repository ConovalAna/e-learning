export interface ICourseEnrolmentView {
  courseId: string;
  name: string;
  description: string;
  imageUrl: string;
  progress: number;
  lessonsProgress: ILessonProgressView[];
  chapterProgress: IChapterProgress[];
}

export interface ILessonProgressView {
  lessonId: string;
  chapterId: string;
  name: string;
  description: string;
  lastSlideNumber: number;
  currentNumberOfSlides: number;
  lastLearnedDate: Date;
  progress: number;
  order: number;
}

export interface IChapterProgress {
  chapterId: string;
  name: string;
  description: string;
  numberOfLessons: number;
  fullProgressedLessons: number;
  lessonsProgress: ILessonProgressView[];
  progress: number;
}

export interface ILessonProgress {
  id: string;
  chapterId: string;
  lastSlideNumber: number;
  currentNumberOfSlides: number;
  lastLearnedDate: Date;
}
