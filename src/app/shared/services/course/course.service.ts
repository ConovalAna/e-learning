import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChapter, ICourse } from './course.interface';


@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/Courses/";

    getAllCourses() {
        return this.http.get<ICourse[]>(this.apiUrl + "GetAllCourses");
    }

    getCourseById(id: string) {
        return this.http.get<ICourse>(this.apiUrl + id);
    }


    getChapters() {
        return this.http.get<IChapter[]>(this.apiUrl + "chapters");
    }
}