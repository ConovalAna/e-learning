import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson, ILessonUpdateOrder } from './lesson.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { forkJoin, merge, tap } from 'rxjs';

const queryKeys = {
  lessons: 'lessons',
};

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) { }

  apiUrl = 'https://localhost:44302/lessons/';

  getAllLessonForChapter(chapterId: string) {
    return this.http
      .get<ILesson[]>(this.apiUrl + 'for-chapter/' + chapterId)
      .pipe(tap((result) => result?.sort(this.orderLessonFunction)));
  }

  orderLessonFunction(a: ILesson, b: ILesson): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
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

  deleteLessonForChapter(lessonId: string, chapterId: string, courseId: string) {
    return this.http.delete<IdResult<string>>(
      this.apiUrl + 'course/' + courseId + '/for-chapter/' + chapterId + '/lessons/' + lessonId
    );
  }

  updateLessonsOrder({
    chapterId,
    lessons,
  }: {
    chapterId: string;
    lessons: ILessonUpdateOrder[];
  }) {
    let obs = lessons.map((lesson) =>
      this.http.put(
        this.apiUrl +
        lesson.id +
        '/order/' +
        lesson.order +
        '/for-chapter/' +
        chapterId,
        null
      )
    );
    return forkJoin(obs);
  }
}
