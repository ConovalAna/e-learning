import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChapter, ICourse } from './course.interface';


@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://my-json-server.typicode.com/LazarencoAna/licenta-mock-server/";
    getCourses() {
        return this.http.get<ICourse[]>(this.apiUrl + "courses");
    }

    getChapters() {
        return this.http.get<IChapter[]>(this.apiUrl + "chapters");
    }
}