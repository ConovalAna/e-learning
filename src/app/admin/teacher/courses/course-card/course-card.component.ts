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

  hideOptionText: string = 'Hide';
  visibleOptionText: string = 'Show';

  onClick() {
    this.onClickEvent.emit(this.course?.id);
  }

  constructor(private courseService: CourseService) { }

  deleteCourseMutation = this.courseService.deleteCourseByTeacher();
  updateCourseMutation = this.courseService.updateCourseByTeacher();


  deleteCourse() {
    this.deleteCourseMutation.mutate(this.course?.id).then();
  }
  shareCourse() {

    //this.deleteCourseMutation.mutate(this.course?.id).then();
  }
  hideCourse() {

    if (this.course != null) {
      this.course.visible = !this.course.visible;
      this.updateCourseMutation.mutate(this.course).then();
    }
  }

  archiveCourse() {

    if (this.course != null) {
      // this.course.archived = false;
      this.course.archived = true;
      this.updateCourseMutation.mutate(this.course).then();
    }
  }
}
