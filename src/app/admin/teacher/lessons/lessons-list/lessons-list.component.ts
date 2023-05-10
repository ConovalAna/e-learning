import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChapter } from 'src/app/shared/services/chapter';
import { ILesson, LessonService } from 'src/app/shared/services/lesson';
import { LessonAddComponent } from '../lesson-add/lesson-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent {
  private _chapter: IChapter | undefined;
  @Input()
  get chapter(): IChapter | undefined {
    return this._chapter;
  }
  set chapter(chapter: IChapter | undefined) {
    this._chapter = chapter;
    this.lessonService
      .getAllLessonForChapter(chapter?.id ?? '')
      .subscribe((data) => {
        this.lessons = data;
      });
  }

  lessons: ILesson[] = [];
  constructor(
    public dialog: MatDialog,
    private lessonService: LessonService,
    public router: Router
  ) {
    console.log(this.chapter);
    this.lessonService
      .getAllLessonForChapter(this.chapter?.id ?? '')
      .subscribe((data) => {
        this.lessons = data;
      });
  }

  deleteLesson(lessonId: string) {
    this.lessonService
      .deleteLessonForChapter(lessonId, this.chapter?.id ?? '')
      .subscribe((result) => {
        new Promise((res) => setTimeout(res, 500)).then(() => {
          this.lessonService
            .getAllLessonForChapter(this.chapter?.id ?? '')
            .subscribe((data) => {
              this.lessons = data;
            });
        });
      });
  }

  openAddLessonDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(LessonAddComponent, {
      data: { chapterId: this.chapter?.id, isEditMode: false },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.lessonService
          .getAllLessonForChapter(this.chapter?.id ?? '')
          .subscribe((data) => {
            this.lessons = data;
          });
      });
    });
  }

  EditAddLessonDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    lesson: ILesson
  ): void {
    const dialogRef = this.dialog.open(LessonAddComponent, {
      data: { chapterId: this.chapter?.id, isEditMode: true, lesson: lesson },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.lessonService
          .getAllLessonForChapter(this.chapter?.id ?? '')
          .subscribe((data) => {
            this.lessons = data;
          });
      });
    });
  }
}
