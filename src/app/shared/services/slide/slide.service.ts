import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IPracticeSlide, ISlide, ITestSlide } from './slide.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  slides: 'slides',
  testSlides: 'testslides',
  practiceSlides: 'testslides',
};

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);

  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:44302/lessons/';
  testApiUrl = 'https://localhost:44302/tests/';
  practiceApiUrl = 'https://localhost:44302/practice/';

  addSlideForLesson() {
    return this.useMutation(
      ({
        slide,
        lessonId,
        chapterId,
      }: {
        slide: ISlide;
        lessonId: string;
        chapterId: string;
      }) => {
        return this.http
          .post<IdResult<string>>(
            this.apiUrl + lessonId + '/slides' + '/chapter/' + chapterId,
            slide
          )
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([queryKeys.slides, lessonId]);
            })
          );
      }
    );
  }

  updateSlideForLesson() {
    return this.useMutation(
      ({ slide, lessonId }: { slide: ISlide; lessonId: string }) => {
        return this.http
          .put(this.apiUrl + lessonId + '/slides/' + slide.id, slide)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([queryKeys.slides, lessonId]);
            })
          );
      }
    );
  }

  deleteSlideForLesson() {
    return this.useMutation(
      ({
        slide,
        lessonId,
        chapterId,
      }: {
        slide: ISlide;
        lessonId: string;
        chapterId: string;
      }) => {
        return this.http
          .delete(
            this.apiUrl +
              lessonId +
              '/slides/' +
              slide.id +
              '/chapter/' +
              chapterId
          )
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([queryKeys.slides, lessonId]);
            })
          );
      }
    );
  }

  orderSlideFunction(a: ISlide, b: ISlide): number {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  fetchSlidesForLesson(lessonId: string) {
    return this.useQuery(
      [queryKeys.slides, lessonId],
      () =>
        this.http
          .get<ISlide[]>(this.apiUrl + lessonId + '/slides')
          .pipe(tap((result) => result?.sort(this.orderSlideFunction))),
      { staleTime: Infinity, retry: 3 }
    );
  }

  changeSlideOrderForLesson() {
    return this.useMutation(
      ({
        slideId,
        lessonId,
        order,
      }: {
        slideId: string;
        lessonId: string;
        order: number;
      }) => {
        return this.http.put(
          this.apiUrl + lessonId + '/slides/' + slideId + '/order/' + order,
          null
        );
      }
    );
  }

  /// Test slides

  addSlideForTest() {
    return this.useMutation(
      ({ slide, testId }: { slide: ITestSlide; testId: string }) => {
        return this.http
          .post<IdResult<string>>(this.testApiUrl + testId + '/slides', slide)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.testSlides,
                testId,
              ]);
            })
          );
      }
    );
  }

  updateSlideForTest() {
    return this.useMutation(
      ({ slide, testId }: { slide: ITestSlide; testId: string }) => {
        return this.http
          .put(this.testApiUrl + testId + '/slides/' + slide.id, slide)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.testSlides,
                testId,
              ]);
            })
          );
      }
    );
  }

  deleteSlideForTest() {
    return this.useMutation(
      ({ slide, testId }: { slide: ITestSlide; testId: string }) => {
        return this.http
          .delete(this.testApiUrl + testId + '/slides/' + slide.id)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.testSlides,
                testId,
              ]);
            })
          );
      }
    );
  }

  fetchSlidesForTest(testId: string) {
    return this.useQuery(
      [queryKeys.slides, testId],
      () =>
        this.http
          .get<ITestSlide[]>(this.testApiUrl + testId + '/slides')
          .pipe(tap((result) => result?.sort(this.orderSlideFunction))),
      { staleTime: Infinity, retry: 3 }
    );
  }

  changeSlideOrderForTest() {
    return this.useMutation(
      ({
        slideId,
        testId,
        order,
      }: {
        slideId: string;
        testId: string;
        order: number;
      }) => {
        return this.http.put(
          this.testApiUrl + testId + '/slides/' + slideId + '/order/' + order,
          null
        );
      }
    );
  }

  /// Practice slides

  addSlideForPractice() {
    return this.useMutation(
      ({
        slide,
        practiceId,
      }: {
        slide: IPracticeSlide;
        practiceId: string;
      }) => {
        return this.http
          .post<IdResult<string>>(
            this.practiceApiUrl + practiceId + '/slides',
            slide
          )
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.practiceSlides,
                practiceId,
              ]);
            })
          );
      }
    );
  }

  updateSlideForPractice() {
    return this.useMutation(
      ({
        slide,
        practiceId,
      }: {
        slide: IPracticeSlide;
        practiceId: string;
      }) => {
        return this.http
          .put(this.practiceApiUrl + practiceId + '/slides/' + slide.id, slide)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.practiceSlides,
                practiceId,
              ]);
            })
          );
      }
    );
  }

  deleteSlideForPractice() {
    return this.useMutation(
      ({
        slide,
        practiceId,
      }: {
        slide: IPracticeSlide;
        practiceId: string;
      }) => {
        return this.http
          .delete(this.practiceApiUrl + practiceId + '/slides/' + slide.id)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.practiceSlides,
                practiceId,
              ]);
            })
          );
      }
    );
  }

  fetchSlidesForPractice(practiceId: string) {
    return this.useQuery(
      [queryKeys.practiceSlides, practiceId],
      () =>
        this.http
          .get<IPracticeSlide[]>(this.practiceApiUrl + practiceId + '/slides')
          .pipe(tap((result) => result?.sort(this.orderSlideFunction))),
      { staleTime: Infinity, retry: 1 }
    );
  }

  changeSlideOrderForPractice() {
    return this.useMutation(
      ({
        slideId,
        practiceId,
        order,
      }: {
        slideId: string;
        practiceId: string;
        order: number;
      }) => {
        return this.http.put(
          this.practiceApiUrl +
            practiceId +
            '/slides/' +
            slideId +
            '/order/' +
            order,
          null
        );
      }
    );
  }
}
