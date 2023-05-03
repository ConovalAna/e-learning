import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ISlide } from './slide.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  slides: 'slides',
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

  addSlideForLesson() {
    return this.useMutation(
      ({ slide, lessonId }: { slide: ISlide; lessonId: string }) => {
        return this.http
          .post<IdResult<string>>(this.apiUrl + lessonId + '/slides', slide)
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
      ({ slide, lessonId }: { slide: ISlide; lessonId: string }) => {
        return this.http
          .delete(this.apiUrl + lessonId + '/slides/' + slide.id)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([queryKeys.slides, lessonId]);
            })
          );
      }
    );
  }

  fetchSlidesForLesson(lessonId: string) {
    return this.useQuery(
      [queryKeys.slides, lessonId],
      () => this.http.get<ISlide[]>(this.apiUrl + lessonId + '/slides'),
      { staleTime: Infinity }
    );
  }
}
