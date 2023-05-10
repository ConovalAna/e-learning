import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from '../../shared/services/course';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss'],
})
export class CoursesOverviewComponent {

  courses: ICourse[] = [];
  limit: number = 10;
  offset: number = 0;
  listIsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {
    this.courseService.getAllPagedFilteredCourses("", this.offset, this.limit).subscribe((fetchedCourses) => {
      this.courses = fetchedCourses;
    })
    this.offset = this.limit;
  }

  viewMoreClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  searchClick(searchString: string) {
    this.offset = 0;
    this.courseService.getAllPagedFilteredCourses(searchString, this.offset, this.limit).subscribe((fetchedCourses) => {
      this.courses = fetchedCourses;
      this.listIsLoaded = fetchedCourses.length === 0;
    })
    this.offset = this.offset + this.limit;
  }

  onScroll(searchString: string) {
    console.log('scrolled!!');
    if (!this.listIsLoaded) {
      this.courseService.getAllPagedFilteredCourses(searchString, this.offset, this.limit).subscribe((fetchedCourses) => {
        this.courses = this.courses.concat(fetchedCourses);
        this.listIsLoaded = fetchedCourses.length === 0;
      })
      this.offset = this.offset + this.limit;
    }
  }

}
