import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { SlideDetailComponent } from './slides/slide-detail/slide-detail.component';
import { SlidesCarouselComponent } from './slides/slides-carousel/slides-carousel.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { ChapterAddComponent } from './chapters/chapter-add/chapter-add.component';
import { SlideAddComponent } from './slides/slide-add/slide-add.component';
import { CourseAddViewComponent } from './courses/course-add-view/course-add-view.component';
import { TestDetailComponent } from './tests/test-detail/test-detail.component';
import { TestSlideAddComponent } from './test-slides/test-slide-add/test-slide-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses',
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoursesListComponent,
          },
          {
            path: 'new',
            component: CourseAddViewComponent,
          },
          {
            path: ':courseId',
            component: CourseDetailComponent,
          },
          {
            path: ':courseId/chapters',
            children: [
              {
                path: '',
                component: CourseDetailComponent,
              },
              {
                path: 'new',
                component: ChapterAddComponent,
              },
              {
                path: ':chapterId',
                component: CourseDetailComponent,
              },
              {
                path: ':chapterId/lessons/:lessonId',
                children: [
                  {
                    path: '',
                    component: LessonDetailComponent,
                  },
                  {
                    path: 'slides/:slideId',
                    component: SlideAddComponent,
                  },
                ],
              },
              {
                path: ':chapterId/tests/:testId',
                children: [
                  {
                    path: '',
                    component: TestDetailComponent,
                  },
                  {
                    path: 'slides/:slideId',
                    component: TestSlideAddComponent,
                  },
                ],
              },
            ],
          },
          // {
          //   path: ':courseId/lessons',
          //   children: [
          //     {
          //       path: '',
          //       component: LessonsListComponent,
          //     },
          //     {
          //       path: 'new',
          //       component: LessonDetailComponent,
          //     },
          //     {
          //       path: ':id',
          //       component: LessonDetailComponent,
          //     },
          //     {
          //       path: ':lessonId/slides',
          //       children: [
          //         {
          //           path: '',
          //           component: SlidesListComponent,
          //         },
          //         {
          //           path: 'new',
          //           component: SlideDetailComponent,
          //         },
          //         {
          //           path: ':id',
          //           component: SlideDetailComponent,
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: '**',
        redirectTo: 'courses',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
