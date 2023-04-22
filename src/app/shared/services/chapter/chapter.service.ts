import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChapter } from './chapter.interface';


@Injectable({
    providedIn: 'root'
})
export class ChapterService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/Chapter/";

    getAllChapters(courseId: string) {
        return this.http.get<IChapter[]>(this.apiUrl + "GetAllChapters/" + courseId);
    }

    // getCourseById(id: string) {
    //     return this.http.get<IChapter>(this.apiUrl + "GetCourseById/" + id);
    // }
}