import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { LessonDetailComponent } from './lessons/lesson-detail/lesson-detail.component';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { SlideDetailComponent } from './slides/slide-detail/slide-detail.component';
import { SlidesListComponent } from './slides/slides-list/slides-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { ChapterAddComponent } from './chapters/chapter-add/chapter-add.component';

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
            component: CourseAddComponent,
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
