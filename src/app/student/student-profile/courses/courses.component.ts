import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCourseService } from 'src/app/shared/services/course';
import { ICourseEnrolmentView } from 'src/app/shared/services/course/course-enrolment.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses?: ICourseEnrolmentView[];

  constructor(
    private courseService: UserCourseService,
    private router: Router
  ) {
    this.courseService
      .getSubscribedCoursesView()
      .result$.subscribe((fetchedCourses) => {
        this.courses = fetchedCourses.data;
      });
  }

  clickOnCourse(id: string) {
    this.router.navigate([`student/courses/${id}`]);
  }
}
