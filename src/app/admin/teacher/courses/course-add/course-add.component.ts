import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent {
  @Input() course!: ICourse;
  @Input() btnText!: string;
  @Output() onClickBtn: EventEmitter<ICourse> = new EventEmitter<ICourse>();

  onChangeImageUrl(imageUrl: string): void {
    console.log(imageUrl);
    this.course.imageUrl = imageUrl;
  }

  onClick() {
    this.onClickBtn.emit(this.course);
  }
}
