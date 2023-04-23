import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILesson, LessonService } from 'src/app/shared/services/lesson';

interface LessonAddProps {
  chapterId: string;
}

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss'],
})
export class LessonAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LessonAddProps,
    private lessonService: LessonService
  ) {}

  lesson: ILesson = {
    id: '',
    name: '',
    description: '',
  };
  addLesson() {
    this.lessonService
      .addLessonForChapter(this.lesson, this.data.chapterId)
      .subscribe();
  }
}
