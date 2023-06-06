import { Component } from '@angular/core';
import {
  CourseService,
  ICourse,
  UserCourseService,
} from 'src/app/shared/services/course';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  courses?: ICourse[];
  currentCourseId?: string;

  public chart: any;
  constructor(
    private courseService: CourseService,
    private userCourseService: UserCourseService
  ) {
    this.courseService
      .getAllTeacherCourses()
      .result$.subscribe((fetchedCourses) => {
        if (fetchedCourses.isSuccess) this.courses = fetchedCourses.data;
        if (fetchedCourses.data?.length) {
          this.currentCourseId = fetchedCourses.data[0].id;
        }
      });
  }

  courseClickFunction(courseId: string): void {
    this.currentCourseId = courseId;
    this.userCourseService
      .getUserCourseStatistics(courseId)
      .result$.subscribe((result) => {});
  }
}
