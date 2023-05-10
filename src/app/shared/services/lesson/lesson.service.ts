import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson } from './lesson.interface';
import { IdResult } from '../../interfaces/id-result.interface';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:44302/lessons/';

  getAllLessonForChapter(chapterId: string) {
    return this.http.get<ILesson[]>(this.apiUrl + 'for-chapter/' + chapterId);
  }

  getLessonForChapter(chapterId: string, lessonId: string) {
    return this.http.get<ILesson>(
      this.apiUrl + 'for-chapter/' + chapterId + '/lessons/' + lessonId
    );
  }

  /// Teacher Region

  addLessonForChapter(lesson: ILesson, chapterId: string) {
    return this.http.post<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  updateLessonForChapter(lesson: ILesson, chapterId: string) {
    return this.http.put<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  deleteLessonForChapter(lessonId: string, chapterId: string) {
    return this.http.delete<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId + '/lessons/' + lessonId
    );
  }
}
