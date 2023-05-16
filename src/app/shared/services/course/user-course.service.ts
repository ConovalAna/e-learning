import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import {
  ICourseEnrolmentView,
  ILessonProgress,
} from './course-enrolment.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  teacherCourses: 'teacher-courses',
  studentSubscribedCourses: 'student-subscribed-courses',
};

@Injectable({
  providedIn: 'root',
})
export class UserCourseService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);
  constructor(private http: HttpClient) {}

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

  getCourseSubscriptionProgress(courseId: string) {
    return this.useQuery(
      [queryKeys.studentSubscribedCourses, courseId],
      () => {
        return this.http.get<ICourseEnrolmentView>(
          this.userCourseApiUrl + courseId
        );
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
              courseId,
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
}
