import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course';
import { LessonService } from './services/lesson';
import { SlideService } from './services/slide';
import { HttpClientModule } from '@angular/common/http';
import { AvatarImageComponent } from './components/avatar-image/avatar-image.component';

@NgModule({
  declarations: [AvatarImageComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [AvatarImageComponent],
  providers: [CourseService, LessonService, SlideService]
})
export class SharedModule { }
