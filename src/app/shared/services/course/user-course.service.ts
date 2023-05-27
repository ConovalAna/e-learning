import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import {
  IChapterProgress,
  ICourseEnrolmentView,
  ILessonProgress,
  ILessonProgressView,
  ITestProgress,
  ITestProgressView,
} from './course-enrolment.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  teacherCourses: 'teacher-courses',
  studentSubscribedCourses: 'student-subscribed-courses',
  studentTestProgres: 'student-test-courses',
};

@Injectable({
  providedIn: 'root',
})
export class UserCourseService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);
  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:44302/Courses/';
  userCourseApiUrl = 'https://localhost:44302/UserCourses/';

  getAllPagedFilteredCourses(search: string, offset: number, limit: number) {
    return this.http.get<ICourse[]>(
      this.apiUrl +
      'search?query=' +
      search +
      '&offset=' +
      offset +
      '&limit=' +
      limit
    );
  }

  getSubscribedCoursesView() {
    return this.useQuery(
      [queryKeys.studentSubscribedCourses],
      () => {
        return this.http.get<ICourseEnrolmentView[]>(
          this.userCourseApiUrl + 'view'
        );
      },
      { staleTime: Infinity }
    );
  }

  orderLessonFunction(a: ILessonProgressView, b: ILessonProgressView): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  orderTestsFunction(a: ITestProgressView, b: ITestProgressView): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  getCourseSubscriptionProgress(courseId: string) {
    return this.useQuery(
      [queryKeys.studentSubscribedCourses, courseId],
      () => {
        return this.http
          .get<ICourseEnrolmentView>(this.userCourseApiUrl + courseId)
          .pipe(
            tap((result) =>
              result?.lessonsProgress?.sort(this.orderLessonFunction)
            )
          );
      },
      { staleTime: Infinity }
    );
  }

  getChapterSubscriptionProgress(courseId: string, chapterId: string) {
    return this.useQuery(
      [queryKeys.studentSubscribedCourses, courseId],
      () => {
        return this.http
          .get<IChapterProgress>(this.userCourseApiUrl + courseId + '/chapters/' + chapterId)
          .pipe(
            tap((result) =>
              result?.lessonsProgress?.sort(this.orderLessonFunction)
            )
          );
      },
      { staleTime: Infinity }
    );
  }

  getChapterTestsProgress(courseId: string, chapterId: string) {
    return this.useQuery(
      [queryKeys.studentTestProgres, courseId],
      () => {
        return this.http
          .get<ITestProgressView[]>(this.userCourseApiUrl + courseId + '/chapters/' + chapterId + '/tests')
          .pipe(tap((result) => result?.sort(this.orderTestsFunction)));
      },
      { staleTime: Infinity }
    );
  }


  subscribeToCourse() {
    return this.useMutation((courseId: string) => {
      return this.http
        .post(this.userCourseApiUrl + '?courseId=' + courseId, null)
        .pipe(
          tap(() => {
            // Invalidate to refetch
            this.queryClient.invalidateQueries([
              queryKeys.studentSubscribedCourses,
            ]);
          })
        );
    });
  }

  updateLessonProgress() {
    return this.useMutation(
      ({
        courseId,
        lessonProgress,
      }: {
        courseId: string;
        lessonProgress: ILessonProgress;
      }) => {
        return this.http.post(
          this.userCourseApiUrl + courseId + '/lessons',
          lessonProgress
        );
      }
    );
  }

  updateTestProgress() {
    return this.useMutation(
      ({
        courseId,
        testProgress,
      }: {
        courseId: string;
        testProgress: ITestProgress;
      }) => {
        return this.http.post(
          this.userCourseApiUrl + courseId + '/tests',
          testProgress
        );
      }
    );
  }
}
