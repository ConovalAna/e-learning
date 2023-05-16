import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserCourseService } from 'src/app/shared/services/course';
import { ICourseEnrolmentView } from 'src/app/shared/services/course/course-enrolment.interface';

@Component({
  selector: 'app-course-dropdown',
  templateUrl: './course-dropdown.component.html',
  styleUrls: ['./course-dropdown.component.scss'],
})
export class CourseDropdownComponent {
  searchQuery = '';
  courses?: ICourseEnrolmentView[];
  filteredCourses = this.courses;

  constructor(
    private router: Router,
    private courseService: UserCourseService
  ) {
    this.courseService
      .getSubscribedCoursesView()
      .result$.subscribe((fetchedCourses) => {
        this.courses = fetchedCourses.data;
        this.filteredCourses = fetchedCourses.data;
        console.log(this.filteredCourses);
      });
  }

  clickOnCourse(id: string) {
    this.router.navigate([`/student/courses/${id}`]);
  }

  onSearchChange(newValue: any): void {
    this.searchQuery = newValue;
    this.filteredCourses = this.courses?.filter((course) =>
      course.name
        .toLowerCase()
        .trim()
        .includes(this.searchQuery.toLowerCase().trim())
    );
  }
}
