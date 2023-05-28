import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonComponent } from '../tutorial/lesson/lesson.component';
import { AuthStudentComponent } from './auth-student/auth-student.component';
import { CourseOverviewComponent } from './course/course-overview/course-overview.component';
import { CourseSummaryComponent } from './course/course-summary/course-summary.component';
import { CourseLessonsComponent } from './course/lesson/course-lessons/course-lessons.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { ChapterSectionComponent } from './chapter-section/chapter-section.component';
import { ProfileComponent } from './student-profile/profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TestsComponent } from '../tutorial/test/tests/tests.component';
import { PracticeComponent } from '../tutorial/practice/practice.component';

const routes: Routes = [
  {
    path: '',
    component: AuthStudentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'courses',
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: 'about',
        pathMatch: 'full',
        component: AboutUsComponent,
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoursesOverviewComponent,
          },
          {
            path: ':id',
            component: CourseOverviewComponent,
          },
          {
            path: ':id/summary',
            component: CourseSummaryComponent,
          },
          {
            path: ':id/chapter/:chapterId',
            component: ChapterSectionComponent,
          },
          {
            path: ':id/chapter/:chapterId/lessons',
            children: [
              {
                path: ':lessonId',
                pathMatch: 'full',
                redirectTo: ':lessonId/tutorial',
              },
              {
                path: ':lessonId/tutorial',
                component: LessonComponent,
              },
            ],
          },
          {
            path: ':id/chapter/:chapterId/tests',
            children: [
              {
                path: ':testId',
                pathMatch: 'full',
                component: TestsComponent,
              },
            ],
          },
          {
            path: ':id/chapter/:chapterId/practice',
            children: [
              {
                path: ':practiceId',
                pathMatch: 'full',
                component: PracticeComponent,
              },
            ],
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
