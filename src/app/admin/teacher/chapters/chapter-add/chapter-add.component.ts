import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { CourseService } from 'src/app/shared/services/course';

interface ChapterAddProps {
  courseId: string;
  isEditMode: boolean;
  chapter: IChapter;
}

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.scss'],
})
export class ChapterAddComponent {
  chapter: IChapter = {
    id: '',
    name: '',
    description: '',
    visible: false,
  };
  isEditMode: boolean = false;
  addChapterMutation = this.chapterService.addChapter();
  updateChapterMutation = this.chapterService.updateChapter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChapterAddProps,
    private chapterService: ChapterService
  ) {
    this.isEditMode = this.data.isEditMode;
    if (this.data.chapter) {
      this.chapter = this.data.chapter;
    }
  }

  addChapter() {
    this.addChapterMutation
      .mutate({ courseId: this.data.courseId, chapter: this.chapter })
      .then((result) => { });
  }

  updateChapter() {
    this.updateChapterMutation
      .mutate({ courseId: this.data.courseId, chapter: this.chapter })
      .then((result) => { });
  }
}
