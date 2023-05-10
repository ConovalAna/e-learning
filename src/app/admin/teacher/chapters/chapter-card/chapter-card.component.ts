import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { ChapterAddComponent } from '../chapter-add/chapter-add.component';

@Component({
  selector: 'app-chapter-card',
  templateUrl: './chapter-card.component.html',
  styleUrls: ['./chapter-card.component.scss'],
})
export class ChapterCardComponent {
  @Input() chapter?: IChapter;
  @Input() courseId?: string;

  @Input() isSelected: boolean;
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private chapterService: ChapterService,
    public dialog: MatDialog
  ) {
    this.isSelected = false;
  }

  onClick() {
    this.onClickEvent.emit(this.chapter?.id);
  }

  deleteChapterMutation = this.chapterService.deleteChapter();

  deleteChapter() {
    this.deleteChapterMutation
      .mutate({
        courseId: this.courseId ?? '',
        chapterId: this.chapter?.id ?? '',
      })
      .then((result) => {});
  }

  openUpdateChapterDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(ChapterAddComponent, {
      data: {
        courseId: this.courseId,
        isEditMode: true,
        chapter: this.chapter,
      },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {});
    });
  }
}
