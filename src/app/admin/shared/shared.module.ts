import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course';
import { LessonService } from './services/lesson';
import { SlideService } from './services/slide';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [CourseService, LessonService, SlideService]
})
export class SharedModule { }
