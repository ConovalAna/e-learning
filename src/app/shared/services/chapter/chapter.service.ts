import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IChapter, IStudentChapter } from './chapter.interface';
import { IdResult } from '../../interfaces/id-result.interface';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { tap } from 'rxjs';

const queryKeys = {
  chapters: 'chapters',
};

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  constructor(private http: HttpClient) {}

  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);

  apiUrl = 'https://localhost:44302/courses/';

  getAllChapters(courseId: string) {
    return this.useQuery(
      [queryKeys.chapters, courseId],
      () => {
        return this.http.get<IChapter[]>(this.apiUrl + courseId + '/chapters');
      },
      { staleTime: Infinity }
    );
  }

  // getCourseById(id: string) {
  //     return this.http.get<IChapter>(this.apiUrl + "GetCourseById/" + id);
  // }

  addChapter() {
    return this.useMutation(
      ({ courseId, chapter }: { courseId: string; chapter: IChapter }) => {
        return this.http
          .post<IdResult<string>>(this.apiUrl + courseId + '/chapters', chapter)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.chapters,
                courseId,
              ]);
            })
          );
      }
    );
  }

  updateChapter() {
    return this.useMutation(
      ({ courseId, chapter }: { courseId: string; chapter: IChapter }) => {
        return this.http
          .put<IdResult<string>>(this.apiUrl + courseId + '/chapters', chapter)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.chapters,
                courseId,
              ]);
            })
          );
      }
    );
  }

  deleteChapter() {
    return this.useMutation(
      ({ courseId, chapterId }: { courseId: string; chapterId: string }) => {
        return this.http
          .delete<any>(this.apiUrl + courseId + '/chapters/' + chapterId)
          .pipe(
            tap((result) => {
              // Invalidate to refetch
              this.queryClient.invalidateQueries([
                queryKeys.chapters,
                courseId,
              ]);
            })
          );
      }
    );
  }
}
