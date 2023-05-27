import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChapter } from 'src/app/shared/services/chapter';
import { Router } from '@angular/router';
import { PracticeAddComponent } from '../practice-add/practice-add.component';
import { IPractice, PracticeService } from 'src/app/shared/services/practice';

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.scss'],
})
export class PracticeListComponent {
  private _chapter: IChapter | undefined;
  public dragIconId!: string;
  public dropTileId!: string;
  @Input()
  get chapter(): IChapter | undefined {
    return this._chapter;
  }
  set chapter(chapter: IChapter | undefined) {
    this._chapter = chapter;
    this.practiceService
      .getAllPracticeForChapter(chapter?.id ?? '')
      .subscribe((data) => {
        this.practices = data;
      });
  }

  practices: IPractice[] = [];
  constructor(
    public dialog: MatDialog,
    private practiceService: PracticeService,
    public router: Router
  ) {
    this.updatePractice();
  }

  updatePractice() {
    this.practiceService
      .getAllPracticeForChapter(this.chapter?.id ?? '')
      .subscribe((data) => {
        this.practices = data;
      });
  }

  deletePractice(lessonId: string) {
    this.practiceService
      .deletePracticeForChapter(lessonId, this.chapter?.id ?? '')
      .subscribe((result) => {
        new Promise((res) => setTimeout(res, 500)).then(() => {
          this.updatePractice();
        });
      });
  }

  openAddPracticeDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(PracticeAddComponent, {
      data: {
        chapterId: this.chapter?.id,
        isEditMode: false,
        order: this.practices.length,
      },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updatePractice();
      });
    });
  }

  EditAddPracticeDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    practice: IPractice
  ): void {
    const dialogRef = this.dialog.open(PracticeAddComponent, {
      data: {
        chapterId: this.chapter?.id,
        isEditMode: true,
        practice: practice,
      },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updatePractice();
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
    const dragIndex = this.practices.findIndex(
      (iconObj) => iconObj.id === this.dragIconId
    );
    const dropIndex = this.practices.findIndex(
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
      this.practiceService
        .updatePracticeOrder({
          chapterId: this.chapter?.id ?? '',
          practice: this.practices.map((practices, index) => {
            return { id: practices.id, order: index };
          }),
        })
        .subscribe(() => {
          this.updatePractice();
        });
    });
  }

  public ghostCreateHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'hidden';
  }

  private swapIcons(dragIndex: number, dropIndex: number) {
    const tempObj = this.practices[dragIndex];
    this.practices.splice(dragIndex, 1);
    this.practices.splice(dropIndex, 0, tempObj);
  }
}
