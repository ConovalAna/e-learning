import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISlide } from './slide.interface';
import { IdResult } from '../../interfaces/id-result.interface';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://localhost:44302/lessons/';

  addSlideForLesson(slide: ISlide, lessonId: string) {
    return this.http.post<IdResult<string>>(
      this.apiUrl + lessonId + '/slides',
      slide
    );
  }

  updateSlideForLesson(slide: ISlide, lessonId: string, slideId: string) {
    return this.http.put(this.apiUrl + lessonId + '/slides/' + slideId, slide);
  }

  fetchSlidesForLesson(lessonId: string) {
    return this.http.get<ISlide[]>(this.apiUrl + lessonId + '/slides');
  }
}
