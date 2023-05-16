import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

// Components
import { HeaderAuthStudentComponent } from './header-auth-student/header-auth-student.component';
import { AuthStudentComponent } from './auth-student/auth-student.component';
import { CourseOverviewComponent } from './course/course-overview/course-overview.component';
import { CourseSummaryComponent } from './course/course-summary/course-summary.component';
import { CourseLessonInfoComponent } from './course/lesson/course-lesson-info/course-lesson-info.component';
import { CourseLessonRightAnswerComponent } from './course/lesson/course-lesson-right-answer/course-lesson-right-answer.component';
import { CourseLessonComponent } from './course/lesson/course-lesson/course-lesson.component';
import { CourseLessonsComponent } from './course/lesson/course-lessons/course-lessons.component';
import { CourseLessonInputAnswerComponent } from './course/lesson/course-lesson-input-answer/course-lesson-input-answer.component';

// Common
import { CourseDropdownComponent } from './common/course-dropdown/course-dropdown.component';
import { SidebarMenuStudentComponent } from './common/sidebar-menu-student/sidebar-menu-student.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { ChapterSectionComponent } from './chapter-section/chapter-section.component';
import { TutorialModule } from '../tutorial/tutorial.module';
import { ProfileComponent } from './student-profile/profile/profile.component';
import { NgChartsModule } from 'ng2-charts';
import { AchievementsComponent } from './student-profile/achievements/achievements.component';
import { CoursesComponent } from './student-profile/courses/courses.component';
import { WeekChartComponent } from './student-profile/week-chart/week-chart.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    StudentComponent,
    AuthStudentComponent,
    HeaderAuthStudentComponent,
    CourseDropdownComponent,
    SidebarMenuStudentComponent,
    CourseOverviewComponent,
    CourseSummaryComponent,
    CourseLessonInfoComponent,
    CourseLessonRightAnswerComponent,
    CourseLessonComponent,
    CourseLessonsComponent,
    CourseLessonInputAnswerComponent,
    CoursesOverviewComponent,
    ChapterSectionComponent,
    ProfileComponent,
    AchievementsComponent,
    CoursesComponent,
    WeekChartComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    TutorialModule,
    NgCircleProgressModule.forRoot({}),
    NgChartsModule,
    LottieModule.forRoot({ player: playerFactory }),
    SharedModule,
    FormsModule,
    InfiniteScrollModule,
  ],
})
export class StudentModule {}
