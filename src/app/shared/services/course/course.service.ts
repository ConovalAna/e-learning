import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { ICourseEnrolment } from './course-enrolment.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
    teacherCourses: 'teacher-courses'
}

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    private useQuery = inject(UseQuery);
    private useMutation = inject(UseMutation);
    private queryClient = inject(QueryClientService);


    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/Courses/";
    userCourseApiUrl = "https://localhost:44302/UserCourses";

    getAllCourses() {
        return this.http.get<ICourse[]>(this.apiUrl);
    }



    getCourseById(id: string) {
        return this.http.get<ICourse>(this.apiUrl + id);
    }



    /// Teacher region

    getAllTeacherCourses() {
        return this.useQuery([queryKeys.teacherCourses], () => {
            return this.http.get<ICourse[]>(this.apiUrl);
        });
    }

    getTeacherCourseById(id: string) {
        return this.http.get<ICourse>(this.apiUrl + id);
    }

    addCourseByTeacher() {
        return this.useMutation((course: ICourse) => {
            return this.http.post<IdResult<string>>(this.apiUrl, course).pipe(
                tap((result) => {
                    // Invalidate to refetch
                    this.queryClient.invalidateQueries([queryKeys.teacherCourses]);
                })
            )
        })
    }

    //TODO: extract to another service
    getSubscribedCourses() {
        return this.http.get<ICourseEnrolment[]>(this.userCourseApiUrl);
    }

    subscribeToCourse(courseId: string) {
        return this.http.post(this.userCourseApiUrl + '?courseId=' + courseId, null);
    }

}