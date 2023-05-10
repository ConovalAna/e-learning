import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  courses?: ICourse[];

  courseClickFunction(courseId: string): void {
    let selectedCourse = this.courses?.find((course) => course.id === courseId);
    this.router.navigate(['/teacher/courses', selectedCourse?.id]);
  }

  newCourseClick(): void {
    this.router.navigate(['/teacher/courses/new']);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    this.courseService
      .getAllTeacherCourses()
      .result$.subscribe((fetchedCourses) => {
        if (fetchedCourses.isSuccess) this.courses = fetchedCourses.data;
      });
  }
}
