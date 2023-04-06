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
import { SlidesListComponent } from './slides/slides-list/slides-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { ChaptersListComponent } from './chapters/chapters-list/chapters-list.component';
import { ChapterAddComponent } from './chapters/chapter-add/chapter-add.component';
import { ChapterEditComponent } from './chapters/chapter-edit/chapter-edit.component';
import { ChapterDetailsComponent } from './chapters/chapter-details/chapter-details.component';
import { ChapterCardComponent } from './chapters/chapter-card/chapter-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CourseAddComponent,
    CourseDetailComponent,
    CoursesListComponent,
    LessonAddComponent,
    LessonDetailComponent,
    LessonsListComponent,
    SlideAddComponent,
    SlideDetailComponent,
    SlidesListComponent,
    StatisticsComponent,
    CourseCardComponent,
    ChaptersListComponent,
    ChapterAddComponent,
    ChapterEditComponent,
    ChapterDetailsComponent,
    ChapterCardComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
    SmartbyteMaterialModule
  ]
})
export class TeacherModule { }
