import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChapter } from 'src/app/shared/services/chapter';
import { ILesson, LessonService } from 'src/app/shared/services/lesson';
import { LessonAddComponent } from '../lesson-add/lesson-add.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss'],
})
export class LessonsListComponent {
  private _chapter: IChapter | undefined;
  public dragIconId!: string;
  public dropTileId!: string;
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
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.updateLessons();
  }

  updateLessons() {
    this.lessonService
      .getAllLessonForChapter(this.chapter?.id ?? '')
      .subscribe((data) => {
        this.lessons = data;
      });
  }

  deleteLesson(lessonId: string) {
    let courseRouteId = this.route.snapshot.paramMap.get('courseId');
    this.lessonService
      .deleteLessonForChapter(lessonId, this.chapter?.id ?? '', courseRouteId ?? '')
      .subscribe((result) => {
        new Promise((res) => setTimeout(res, 500)).then(() => {
          this.updateLessons();
        });
      });
  }

  openAddLessonDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let courseRouteId = this.route.snapshot.paramMap.get('courseId');
    const dialogRef = this.dialog.open(LessonAddComponent, {
      data: {
        chapterId: this.chapter?.id,
        isEditMode: false,
        order: this.lessons.length,
        courseId: courseRouteId
      },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updateLessons();
      });
    });
  }

  EditAddLessonDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    lesson: ILesson
  ): void {

    const dialogRef = this.dialog.open(LessonAddComponent, {
      data: { chapterId: this.chapter?.id, isEditMode: true, lesson: lesson, courseId: '' },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updateLessons();
      });
    });
  }

  public onIconDropped(ev: any) {
    ev.drag.dropFinished();
  }

  public onEnterHandler(ev: any): void {
    this.dropTileId = ev.owner.element.nativeElement.id;
    // the event gets raised immediately, but we want to swap only when we drag over another icon
    if (this.dragIconId === this.dropTileId) {
      return;
    }
    const dragIndex = this.lessons.findIndex(
      (iconObj) => iconObj.id === this.dragIconId
    );
    const dropIndex = this.lessons.findIndex(
      (iconObj) => iconObj.id === this.dropTileId
    );
    this.swapIcons(dragIndex, dropIndex);
  }

  public dragStartHandler(id: string): void {
    this.dragIconId = id;
  }

  public dragEndHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'visible';
    new Promise((res) => setTimeout(res, 500)).then(() => {
      this.lessonService
        .updateLessonsOrder({
          chapterId: this.chapter?.id ?? '',
          lessons: this.lessons.map((lesson, index) => {
            return { id: lesson.id, order: index };
          }),
        })
        .subscribe(() => {
          this.updateLessons();
        });
    });
  }

  public ghostCreateHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'hidden';
  }

  private swapIcons(dragIndex: number, dropIndex: number) {
    const tempObj = this.lessons[dragIndex];
    this.lessons.splice(dragIndex, 1);
    this.lessons.splice(dropIndex, 0, tempObj);
  }
}
