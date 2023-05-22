import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService, ICourse } from 'src/app/shared/services/course';
import { ShareComponent } from '../../chapters/share/share.component';

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

  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  deleteCourseMutation = this.courseService.deleteCourseByTeacher();
  updateCourseMutation = this.courseService.updateCourseByTeacher();


  deleteCourse() {
    this.deleteCourseMutation.mutate(this.course?.id).then();
  }

  shareCourse() {
    const dialogRef = this.dialog.open(ShareComponent, {
      //to do todo update link
      data: 'http://localhost:4200/student/courses/' + this.course?.id,
      width: '550px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => { });
    });
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
