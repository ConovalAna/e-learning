import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent {
  @Input() course!: ICourse;
  @Input() isNew!: boolean;
  @Input() btnText!: string;
  @Output() onClickBtn: EventEmitter<ICourse> = new EventEmitter<ICourse>();

  onChangeImageUrl(imageUrl: string): void {
    console.log(imageUrl);
    this.course.imageUrl = imageUrl;
  }

  onClick() {
    this.onClickBtn.emit(this.course);
  }

  restrictNegativeNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);

    if (value < 0) {
      inputElement.value = '0';
      this.course.duration = 0;
    }

    if (value > 100) {
      inputElement.value = '100';
      this.course.duration = 100;
    }
  }
}
