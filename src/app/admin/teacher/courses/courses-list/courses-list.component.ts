import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  courses?: ICourse[];
  collaborativeCourses?: (ICourse | undefined)[];

  courseClickFunction(courseId: string): void {
    // let selectedCourse = this.courses?.find((course) => course.id === courseId);
    this.router.navigate(['/teacher/courses', courseId]);
  }

  newCourseClick(): void {
    this.router.navigate(['/teacher/courses/new']);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userFacade: UserFacade

  ) {
    this.courseService
      .getAllTeacherCourses()
      .result$.subscribe((fetchedCourses) => {
        if (fetchedCourses.isSuccess) this.courses = fetchedCourses.data;
      });
    this.userFacade.onAuthStateChanged$((user) => {
      this.courseService
        .getCollaborativeCourses(user?.uid ?? '')
        .subscribe((fetchedCourses) => {
          this.collaborativeCourses = fetchedCourses ?? [];
        });
    })

  }
}
