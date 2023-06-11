export interface IUserCourseStatistic {
  id: string;
  courseId: string;
  progress: number;
  totalPassedChapter: number;
  joinDate: string;
}

export interface ITestStatistic {
  id?: string;
  courseId: string;
  userId?: string;
  chapterId: string;
  testId: string;
  testNumber: number;
  slideId: string;
  answers?: string[];
}
