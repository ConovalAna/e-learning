import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from './course.interface';
import { IdResult } from '../../interfaces/id-result.interface';


@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/Courses/";

    getAllCourses() {
        return this.http.get<ICourse[]>(this.apiUrl);
    }

    getCourseById(id: string) {
        return this.http.get<ICourse>(this.apiUrl + id);
    }

    addCourse(course: ICourse) {
        return this.http.post<IdResult<string>>(this.apiUrl, course);
    }
}