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
  IgxIconModule,
} from 'igniteui-angular';
import { SlideThumbnailComponent } from './slides/slide-thumbnail/slide-thumbnail.component';
import { CourseAddViewComponent } from './courses/course-add-view/course-add-view.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareComponent } from './chapters/share/share.component';
import { TestsListComponent } from './tests/tests-list/tests-list.component';
import { TestAddComponent } from './tests/test-add/test-add.component';
import { TestSlideAddComponent } from './test-slides/test-slide-add/test-slide-add.component';
import { TestSlideThumbnailComponent } from './test-slides/test-slide-thumbnail/test-slide-thumbnail.component';
import { TestSlidesCarouselComponent } from './test-slides/test-slides-carousel/test-slides-carousel.component';
import { TestDetailComponent } from './tests/test-detail/test-detail.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { PracticeAddComponent } from './practice/practice-add/practice-add.component';
import { PracticeDetailComponent } from './practice/practice-detail/practice-detail.component';
import { PracticeSlideAddComponent } from './practice-slides/practice-slide-add/practice-slide-add.component';
import { PracticeSlideThumbnailComponent } from './practice-slides/practice-slide-thumbnail/practice-slide-thumbnail.component';
import { PracticeSlidesCarouselComponent } from './practice-slides/practice-slides-carousel/practice-slides-carousel.component';
import { CollaborationComponent } from './chapters/collaborations/collaboration/collaboration.component';
import { AddCollaborationComponent } from './chapters/collaborations/add-collaboration/add-collaboration.component';
import { SubscriptionChartComponent } from './statistics/subscription-chart/subscription-chart.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentsSubscriptionTableComponent } from './statistics/students-subscription-table/students-subscription-table.component';
import { TestsStatisticsComponent } from './statistics/tests-statistics/tests-statistics.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';

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
    SubscriptionChartComponent,
    CourseCardComponent,
    ChaptersListComponent,
    ChapterAddComponent,
    ChapterEditComponent,
    ChapterDetailsComponent,
    ChapterCardComponent,
    SlideThumbnailComponent,
    TestsListComponent,
    TestAddComponent,
    ShareComponent,
    TestDetailComponent,
    TestSlideAddComponent,
    TestSlideThumbnailComponent,
    TestSlidesCarouselComponent,
    PracticeListComponent,
    PracticeAddComponent,
    PracticeDetailComponent,
    PracticeSlideAddComponent,
    PracticeSlideThumbnailComponent,
    PracticeSlidesCarouselComponent,
    CollaborationComponent,
    AddCollaborationComponent,
    StudentsSubscriptionTableComponent,
    TestsStatisticsComponent
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
    IgxIconModule,
    IgxDragDropModule,
    ShareModule,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatExpansionModule,
    NgChartsModule,
  ],
})
export class TeacherModule { }
