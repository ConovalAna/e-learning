import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from 'src/app/shared/services/course';
import { ILessonProgress, ITestProgress } from 'src/app/shared/services/course/course-enrolment.interface';
import { ITestSlide, SlideService } from 'src/app/shared/services/slide';
import { ITest } from 'src/app/shared/services/test/test.interface';

interface ISlideProcess extends ITestSlide {
  pressedContinue: boolean;
  visible: boolean;
}

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  slidesProcess: ISlideProcess[] = [];
  testId: string = '';
  chapterId: string = '';
  courseId: string = '';
  test: ITest | undefined;
  testSlides: ITestSlide[] = [];
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
    this.testId = this.route.snapshot.paramMap.get('testId') ?? '';
    this.slideService
      .fetchSlidesForTest(this.testId)
      .result$.subscribe((result) => {
        this.testSlides = result?.data ?? [];
        this.slidesProcess = this.testSlides.map((slideL) => {
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
    } else //test pass 
    {
      debugger;
      let testProgress: ITestProgress = {
        id: this.testId,
        chapterId: this.chapterId,
        totalPoints: this.totalPassTests * this.pointsToEachPassTest,
        pass: true,
        lastLearnedDate: new Date(),
      };

      this.updateCourseTestMutation
        .mutate({
          courseId: this.courseId,
          testProgress: testProgress,
        })
        .then((result) => {
          if (index === this.slidesProcess.length - 1) {
            this.router.navigate([
              `/student/courses/${this.courseId}/chapter/${this.chapterId}`,
            ]);
          }
        });
    }
  }

  ngOnInit(): void { }
}
