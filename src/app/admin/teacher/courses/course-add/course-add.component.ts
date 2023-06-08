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
    this.course.imageUrl = imageUrl;
  }

  onChangeDiplomaUrl(diplomaUrl: string): void {
    this.course.diplomaUrl = diplomaUrl;
  }

  onClick() {
    this.onClickBtn.emit(this.course);
  }

  restricDuration(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.restrictNumber(event, 0, 100);
    const value = parseFloat(inputElement.value);
    this.course.duration = value;
  }

  restricLevel(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.restrictNumber(event, 1, 3);
    const value = parseFloat(inputElement.value);
    this.course.level = value;
  }

  getDocumentName(documentUrl: string): string {
    return documentUrl
      .substring(documentUrl.indexOf('%2F'), documentUrl.indexOf('?alt'))
      .replace('%2F', '');
  }

  restrictNumber(event: Event, min: number, max: number): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseFloat(inputElement.value);

    if (value < min) {
      inputElement.value = min.toString();
    }

    if (value > max) {
      inputElement.value = max.toString();
    }
  }
}
