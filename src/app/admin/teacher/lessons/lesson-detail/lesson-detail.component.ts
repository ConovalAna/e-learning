import { Component, Input } from '@angular/core';
import { ILesson } from 'src/app/shared/services/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent {
  @Input() lesson: ILesson | undefined;

}
