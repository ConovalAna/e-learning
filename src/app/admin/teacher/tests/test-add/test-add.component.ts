import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITest, TestService } from 'src/app/shared/services/test';

interface TestAddProps {
  chapterId: string;
  test: ITest;
  isEditMode: boolean;
  order: number;
}

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss'],
})
export class TestAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TestAddProps,
    private testService: TestService
  ) {
    if (this.data.test) {
      this.test = this.data.test;
    } else {
      this.test.order = this.data.order;
    }
    this.isEditMode = this.data.isEditMode;
  }
  isEditMode: boolean = false;
  test: ITest = {
    id: '',
    name: '',
    description: '',
    order: 0,
    points: 0,
  };

  addTest() {
    this.testService
      .addTestForChapter(this.test, this.data.chapterId)
      .subscribe();
  }

  updateTest() {
    this.testService
      .updateTestForChapter(this.test, this.data.chapterId)
      .subscribe();
  }
}
