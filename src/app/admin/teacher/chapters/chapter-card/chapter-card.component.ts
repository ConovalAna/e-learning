import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { ChapterAddComponent } from '../chapter-add/chapter-add.component';
import { ShareComponent } from '../share/share.component';

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
  updateChapterMutation = this.chapterService.updateChapter();

  deleteChapter() {
    this.deleteChapterMutation
      .mutate({
        courseId: this.courseId ?? '',
        chapterId: this.chapter?.id ?? '',
      })
      .then((result) => { });
  }

  hideChapter() {

    if (this.chapter != null) {
      this.chapter.visible = !this.chapter.visible;
      this.updateChapterMutation
        .mutate({
          courseId: this.courseId ?? '',
          chapter: this.chapter
        })
        .then((result) => { });
    }
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
      new Promise((res) => setTimeout(res, 500)).then(() => { });
    });

  }

}
