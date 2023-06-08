import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-add-view',
  templateUrl: './course-add-view.component.html',
  styleUrls: ['./course-add-view.component.scss'],
})
export class CourseAddViewComponent {
  addCourseMutation = this.courseService.addCourseByTeacher();

  course: ICourse = {
    id: '',
    name: '',
    imageUrl:
      'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg',
    shortDescription: '',
    longDescription: '',
    duration: 0,
    requirements: '',
    achievements: '',
    level: 0,
    numberOfLessons: 0,
    visible: true,
    archived: false,
    diplomaUrl: '',
  };

  constructor(private courseService: CourseService, private router: Router) {}

  addCourse(course: ICourse) {
    this.addCourseMutation.mutate(course).then((result) => {
      this.router.navigate([`/teacher/courses`, result.id]);
    });
  }

  goBack() {
    this.router.navigate(['/teacher/courses']);
  }
}
