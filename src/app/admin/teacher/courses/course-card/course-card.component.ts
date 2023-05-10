import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-courses-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course?: ICourse;
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.onClickEvent.emit(this.course?.id);
  }

  constructor(private courseService: CourseService) {}

  deleteCourseMutation = this.courseService.deleteCourseByTeacher();

  deleteCourse() {
    this.deleteCourseMutation.mutate(this.course?.id).then();
  }
}
