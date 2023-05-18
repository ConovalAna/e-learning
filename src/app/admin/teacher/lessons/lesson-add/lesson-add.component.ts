import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILesson, LessonService } from 'src/app/shared/services/lesson';

interface LessonAddProps {
  chapterId: string;
  lesson: ILesson;
  isEditMode: boolean;
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
  ) {
    if (this.data.lesson) {
      this.lesson = this.data.lesson;
    }
    this.isEditMode = this.data.isEditMode;
  }
  isEditMode: boolean = false;
  lesson: ILesson = {
    id: '',
    name: '',
    description: '',
    order: 0,
  };

  addLesson() {
    this.lessonService
      .addLessonForChapter(this.lesson, this.data.chapterId)
      .subscribe();
  }

  updateLesson() {
    this.lessonService
      .updateLessonForChapter(this.lesson, this.data.chapterId)
      .subscribe();
  }
}
