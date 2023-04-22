import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChapter, IStudentChapter } from './chapter.interface';
import { IdResult } from '../../interfaces/id-result.interface';


@Injectable({
    providedIn: 'root'
})
export class ChapterService {
    constructor(private http: HttpClient) { }

    apiUrl = "https://localhost:44302/courses/";

    getAllChapters(courseId: string) {
        return this.http.get<IChapter[]>(this.apiUrl + courseId + "/chapters");
    }

    getAllStudentChapters(courseId: string) {
        return this.http.get<IStudentChapter[]>(this.apiUrl + courseId + "/chapters");
    }

    // getCourseById(id: string) {
    //     return this.http.get<IChapter>(this.apiUrl + "GetCourseById/" + id);
    // }


    addChapter(courseId: string, chapter: IChapter) {
        return this.http.post<IdResult<string>>(this.apiUrl + courseId + "/chapters", chapter);
    }
}