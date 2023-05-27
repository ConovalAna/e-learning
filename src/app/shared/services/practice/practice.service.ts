import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPractice, IPracticeUpdateOrder } from './practice.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { forkJoin, tap } from 'rxjs';

const queryKeys = {
  practice: 'practice',
};

@Injectable({
  providedIn: 'root',
})
export class PracticeService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:44302/practice/';

  getAllPracticeForChapter(chapterId: string) {
    return this.http
      .get<IPractice[]>(this.apiUrl + 'for-chapter/' + chapterId)
      .pipe(tap((result) => result?.sort(this.orderPracticeFunction)));
  }

  orderPracticeFunction(a: IPractice, b: IPractice): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  getPracticeForChapter(chapterId: string, lessonId: string) {
    return this.http.get<IPractice>(
      this.apiUrl + 'for-chapter/' + chapterId + '/practice/' + lessonId
    );
  }

  /// Teacher Region

  addPracticeForChapter(lesson: IPractice, chapterId: string) {
    return this.http.post<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  updatePracticeForChapter(lesson: IPractice, chapterId: string) {
    return this.http.put<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  deletePracticeForChapter(testId: string, chapterId: string) {
    return this.http.delete<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId + '/practice/' + testId
    );
  }

  updatePracticeOrder({
    chapterId,
    practice,
  }: {
    chapterId: string;
    practice: IPracticeUpdateOrder[];
  }) {
    let obs = practice.map((test) =>
      this.http.put(
        this.apiUrl +
          test.id +
          '/order/' +
          test.order +
          '/for-chapter/' +
          chapterId,
        null
      )
    );
    return forkJoin(obs);
  }
}
