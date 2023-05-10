import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILesson, LessonService } from 'src/app/shared/services/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent {
  lesson: ILesson | undefined;
  chapterId: string;
  lessonId: string;
  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';
    this.courseId = this.route.snapshot.paramMap.get('courseId') ?? '';

    this.lessonService
      .getLessonForChapter(this.chapterId, this.lessonId)
      .subscribe((lesson) => {
        this.lesson = lesson;
      });
  }

  goBack() {
    this.router.navigate(['/teacher/courses/', this.courseId]);
  }
}
