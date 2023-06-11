import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITest, ITestUpdateOrder } from './test.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { forkJoin, merge, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ITestStatistic } from '../course';

const queryKeys = {
  tests: 'tests',
};

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient, public afs: AngularFirestore) {}

  apiUrl = 'https://localhost:44302/tests/';

  getAllTestForChapter(chapterId: string) {
    return this.http
      .get<ITest[]>(this.apiUrl + 'for-chapter/' + chapterId)
      .pipe(tap((result) => result?.sort(this.orderTestFunction)));
  }

  orderTestFunction(a: ITest, b: ITest): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  getTestForChapter(chapterId: string, lessonId: string) {
    return this.http.get<ITest>(
      this.apiUrl + 'for-chapter/' + chapterId + '/tests/' + lessonId
    );
  }

  /// Teacher Region

  addTestForChapter(lesson: ITest, chapterId: string) {
    return this.http.post<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  updateTestForChapter(lesson: ITest, chapterId: string) {
    return this.http.put<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId,
      lesson
    );
  }

  deleteTestForChapter(testId: string, chapterId: string) {
    return this.http.delete<IdResult<string>>(
      this.apiUrl + 'for-chapter/' + chapterId + '/tests/' + testId
    );
  }

  updateTestsOrder({
    chapterId,
    tests,
  }: {
    chapterId: string;
    tests: ITestUpdateOrder[];
  }) {
    let obs = tests.map((test) =>
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

  prepareTestStatistics(
    testStatistics: ITestStatistic[],
    coursesTestsStatistics: any
  ) {
    return this.http.post<any>(this.apiUrl + 'prepare-statistics', {
      testStatistics,
      coursesTestsStatistics,
    });
  }
}
