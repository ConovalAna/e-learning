import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartbyteMaterialModule } from '../../smartbyte-material.module';

import { TeacherRoutingModule } from './teacher-routing.module';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { LessonAddComponent } from './lessons/lesson-add/lesson-add.component';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { SlideAddComponent } from './slides/slide-add/slide-add.component';
import { SlideDetailComponent } from './slides/slide-detail/slide-detail.component';
import { SlidesCarouselComponent } from './slides/slides-carousel/slides-carousel.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { ChaptersListComponent } from './chapters/chapters-list/chapters-list.component';
import { ChapterAddComponent } from './chapters/chapter-add/chapter-add.component';
import { ChapterEditComponent } from './chapters/chapter-edit/chapter-edit.component';
import { ChapterDetailsComponent } from './chapters/chapter-details/chapter-details.component';
import { ChapterCardComponent } from './chapters/chapter-card/chapter-card.component';
import { SharedModule } from '../../shared/shared.module';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/enviorment/enviorment';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { FormsModule } from '@angular/forms';
import { AdminSharedModule } from '../shared/admin-shared.module';
import {
  IgxCarouselModule,
  IgxListModule,
  IgxDragDropModule,
  IgxDragDirective,
  IgxDropDirective,
} from 'igniteui-angular';
import { SlideThumbnailComponent } from './slides/slide-thumbnail/slide-thumbnail.component';
import { CourseAddViewComponent } from './courses/course-add-view/course-add-view.component';

@NgModule({
  declarations: [
    CourseAddComponent,
    CourseAddViewComponent,
    CourseDetailComponent,
    CoursesListComponent,
    LessonAddComponent,
    LessonDetailComponent,
    LessonsListComponent,
    SlideAddComponent,
    SlideDetailComponent,
    SlidesCarouselComponent,
    StatisticsComponent,
    CourseCardComponent,
    ChaptersListComponent,
    ChapterAddComponent,
    ChapterEditComponent,
    ChapterDetailsComponent,
    ChapterCardComponent,
    SlideThumbnailComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    AdminSharedModule,
    SmartbyteMaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    IgxCarouselModule,
    IgxListModule,
    IgxDragDropModule,
  ],
})
export class TeacherModule {}
