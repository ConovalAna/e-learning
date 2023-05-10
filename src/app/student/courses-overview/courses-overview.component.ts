import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from '../../shared/services/course';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss'],
})
export class CoursesOverviewComponent {
  courses?: ICourse[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    this.courseService
      .getAllTeacherCourses()
      .result$.subscribe((fetchedCourses) => {
        this.courses = fetchedCourses.data;
      });
  }

  viewMoreClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
