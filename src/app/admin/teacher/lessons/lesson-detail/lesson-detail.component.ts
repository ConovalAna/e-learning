import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILesson } from 'src/app/shared/services/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent {
  lesson: ILesson | undefined;
  chapterId: string;
  lessonId: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';
  }
}
