import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from 'src/app/shared/services/course';
import { ITestProgress } from 'src/app/shared/services/course/course-enrolment.interface';
import { IPracticeSlide, SlideService } from 'src/app/shared/services/slide';
import { ITest } from 'src/app/shared/services/test/test.interface';

interface ISlideProcess extends IPracticeSlide {
  pressedContinue: boolean;
  visible: boolean;
}

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent {
  slidesProcess: ISlideProcess[] = [];
  practiceId: string = '';
  chapterId: string = '';
  courseId: string = '';
  test: ITest | undefined;
  practiceSlides: IPracticeSlide[] = [];
  totalPassTests: number = 0;
  lastLotie: string = '/assets/lottie/done.json';

  pointsToEachPassTest = 10;

  updateCourseTestMutation = this.userCourseService.updateTestProgress();

  constructor(
    private route: ActivatedRoute,
    private slideService: SlideService,
    private userCourseService: UserCourseService,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.practiceId = this.route.snapshot.paramMap.get('practiceId') ?? '';
    this.slideService
      .fetchSlidesForPractice(this.practiceId)
      .result$.subscribe((result) => {
        this.practiceSlides = result?.data ?? [];
        this.slidesProcess = this.practiceSlides.map((slideL) => {
          let slide: ISlideProcess = {
            ...slideL,
            pressedContinue: false,
            type: 'info',
            visible: false,
          };
          return slide;
        });
        if (this.slidesProcess.length) {
          this.slidesProcess[0].visible = true;
        }
      });
  }

  continueToNextSlide(index: number, pass: boolean) {
    if (pass) {
      this.totalPassTests++;
    }
    if (index !== this.slidesProcess.length - 1) {
      this.slidesProcess[index + 1].visible = true;
    } //test pass
    else if (index === this.slidesProcess.length - 1) {
      this.router.navigate([
        `/student/courses/${this.courseId}/chapter/${this.chapterId}`,
      ]);
    }
  }
}
