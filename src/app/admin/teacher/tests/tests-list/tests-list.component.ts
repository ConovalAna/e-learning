import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChapter } from 'src/app/shared/services/chapter';
import { Router } from '@angular/router';
import { TestAddComponent } from '../test-add/test-add.component';
import { ITest, TestService } from 'src/app/shared/services/test';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
})
export class TestsListComponent {
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
      .getAllTestForChapter(chapter?.id ?? '')
      .subscribe((data) => {
        this.tests = data;
      });
  }

  tests: ITest[] = [];
  constructor(
    public dialog: MatDialog,
    private lessonService: TestService,
    public router: Router
  ) {
    this.updateTests();
  }

  updateTests() {
    this.lessonService
      .getAllTestForChapter(this.chapter?.id ?? '')
      .subscribe((data) => {
        this.tests = data;
      });
  }

  deleteTest(lessonId: string) {
    this.lessonService
      .deleteTestForChapter(lessonId, this.chapter?.id ?? '')
      .subscribe((result) => {
        new Promise((res) => setTimeout(res, 500)).then(() => {
          this.updateTests();
        });
      });
  }

  openAddTestDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      data: {
        chapterId: this.chapter?.id,
        isEditMode: false,
        order: this.tests.length,
      },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updateTests();
      });
    });
  }

  EditAddTestDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    test: ITest
  ): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      data: { chapterId: this.chapter?.id, isEditMode: true, test: test },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {
        this.updateTests();
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
    const dragIndex = this.tests.findIndex(
      (iconObj) => iconObj.id === this.dragIconId
    );
    const dropIndex = this.tests.findIndex(
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
        .updateTestsOrder({
          chapterId: this.chapter?.id ?? '',
          tests: this.tests.map((test, index) => {
            return { id: test.id, order: index };
          }),
        })
        .subscribe(() => {
          this.updateTests();
        });
    });
  }

  public ghostCreateHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'hidden';
  }

  private swapIcons(dragIndex: number, dropIndex: number) {
    const tempObj = this.tests[dragIndex];
    this.tests.splice(dragIndex, 1);
    this.tests.splice(dropIndex, 0, tempObj);
  }
}
