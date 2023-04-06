import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from './course.interface';


@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/Course/";

    getAllCourses() {
        return this.http.get<ICourse[]>(this.apiUrl + "GetAllCourses");
    }

    getCourseById(id: string) {
        return this.http.get<ICourse>(this.apiUrl + "GetCourseById/" + id);
    }
}