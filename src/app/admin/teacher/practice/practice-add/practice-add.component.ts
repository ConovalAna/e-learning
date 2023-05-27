import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPractice } from 'src/app/shared/services/practice/practice.interface';
import { PracticeService } from 'src/app/shared/services/practice/practice.service';

interface PracticeAddProps {
  chapterId: string;
  practice: IPractice;
  isEditMode: boolean;
  order: number;
}

@Component({
  selector: 'app-practice-add',
  templateUrl: './practice-add.component.html',
  styleUrls: ['./practice-add.component.scss'],
})
export class PracticeAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PracticeAddProps,
    private practiceService: PracticeService
  ) {
    if (this.data.practice) {
      this.practice = this.data.practice;
    } else {
      this.practice.order = this.data.order;
    }
    this.isEditMode = this.data.isEditMode;
  }
  isEditMode: boolean = false;
  practice: IPractice = {
    id: '',
    name: '',
    description: '',
    order: 0,
    points: 0,
  };

  addPractice() {
    this.practiceService
      .addPracticeForChapter(this.practice, this.data.chapterId)
      .subscribe();
  }

  updatePractice() {
    this.practiceService
      .updatePracticeForChapter(this.practice, this.data.chapterId)
      .subscribe();
  }
}
