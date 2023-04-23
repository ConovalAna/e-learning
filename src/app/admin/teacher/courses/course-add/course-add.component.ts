import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent {

  addCourseMutation = this.courseService.addCourseByTeacher();

  course: ICourse = {
    id: '',
    name: '',
    imageUrl: '',
    shortDescription: '',
    longDescription: '',
    duration: 0,
    requirements: '',
    achievements: '',
    level: 0,
    numberOfLessons: 0
  };

  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  onChangeImageUrl(imageUrl: string): void {
    console.log(imageUrl);
    this.course.imageUrl = imageUrl;
  };

  addCourse() {
    this.addCourseMutation.mutate(this.course).then(result => {
      console.log(result.id);
      this.router.navigate([`/teacher/courses`, result.id]);
    })
  }
}
