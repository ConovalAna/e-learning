import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPractice } from 'src/app/shared/services/practice/practice.interface';
import { PracticeService } from 'src/app/shared/services/practice/practice.service';

@Component({
  selector: 'app-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice-detail.component.scss'],
})
export class PracticeDetailComponent {
  practice: IPractice | undefined;
  chapterId: string;
  practiceId: string;
  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: PracticeService
  ) {
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.practiceId = this.route.snapshot.paramMap.get('practiceId') ?? '';
    this.courseId = this.route.snapshot.paramMap.get('courseId') ?? '';

    this.testService
      .getPracticeForChapter(this.chapterId, this.practiceId)
      .subscribe((practice) => {
        this.practice = practice;
      });
  }

  goBack() {
    this.router.navigate(['/teacher/courses/', this.courseId]);
  }
}
