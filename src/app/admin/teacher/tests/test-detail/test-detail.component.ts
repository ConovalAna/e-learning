import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITest, TestService } from 'src/app/shared/services/test';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss'],
})
export class TestDetailComponent {
  test: ITest | undefined;
  chapterId: string;
  testId: string;
  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.testId = this.route.snapshot.paramMap.get('testId') ?? '';
    this.courseId = this.route.snapshot.paramMap.get('courseId') ?? '';

    this.testService
      .getTestForChapter(this.chapterId, this.testId)
      .subscribe((test) => {
        this.test = test;
      });
  }

  goBack() {
    this.router.navigate(['/teacher/courses/', this.courseId]);
  }
}
