import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  teacherCourses: 'teacher-courses',
  studentSubscribedCourses: 'student-subscribed-courses',
};

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);
  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:44302/Courses/';
  userCourseApiUrl = 'https://localhost:44302/UserCourses';

  getAllCourses() {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseById(id: string) {
    return this.http.get<ICourse>(this.apiUrl + id);
  }

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

  /// Teacher region

  getAllTeacherCourses() {
    return this.useQuery(
      [queryKeys.teacherCourses],
      () => {
        return this.http.get<ICourse[]>(this.apiUrl + 'for-teacher');
      },
      { staleTime: Infinity, retry: 3 }
    );
  }

  addCourseByTeacher() {
    return this.useMutation((course: ICourse) => {
      return this.http.post<IdResult<string>>(this.apiUrl, course).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }

  updateCourseByTeacher() {
    return this.useMutation((course: ICourse) => {
      return this.http.put<any>(this.apiUrl, course).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }

  deleteCourseByTeacher() {
    return this.useMutation((courseId: string) => {
      return this.http.delete<any>(this.apiUrl + courseId).pipe(
        tap((result) => {
          // Invalidate to refetch
          this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
        })
      );
    });
  }
}
