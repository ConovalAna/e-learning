import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCourseService } from 'src/app/shared/services/course';
import { ILessonProgress } from 'src/app/shared/services/course/course-enrolment.interface';
import { ILesson } from 'src/app/shared/services/lesson';
import { ISlide, SlideService } from 'src/app/shared/services/slide';

interface ISlideProcess extends ISlide {
  pressedContinue: boolean;
  visible: boolean;
}

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  slidesProcess: ISlideProcess[] = [];
  lessonId: string = '';
  chapterId: string = '';
  courseId: string = '';
  lesson: ILesson | undefined;
  lessonSlides: ISlide[] = [];

  updateCourseLessonMutation = this.userCourseService.updateLessonProgress();

  constructor(
    private route: ActivatedRoute,
    private slideService: SlideService,
    private userCourseService: UserCourseService,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';
    this.chapterId = this.route.snapshot.paramMap.get('chapterId') ?? '';
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';
    this.slideService
      .fetchSlidesForLesson(this.lessonId)
      .result$.subscribe((result) => {
        this.lessonSlides = result?.data ?? [];
        this.slidesProcess = this.lessonSlides.map((slideL) => {
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

  continueToNextSlide(currentSlideIndex: number) {
    if (currentSlideIndex !== this.slidesProcess.length - 1) {
      this.slidesProcess[currentSlideIndex + 1].visible = true;
    }

    let lessonProgress: ILessonProgress = {
      id: this.lessonId,
      currentNumberOfSlides: this.slidesProcess.length,
      chapterId: this.chapterId,
      lastSlideNumber: currentSlideIndex + 1,
      lastLearnedDate: new Date(),
    };

    this.updateCourseLessonMutation
      .mutate({
        courseId: this.courseId,
        lessonProgress: lessonProgress,
      })
      .then((result) => {
        if (currentSlideIndex === this.slidesProcess.length - 1) {
          this.router.navigate([
            `/student/courses/${this.courseId}/chapter/${this.chapterId}`,
          ]);
        }
      });
  }

  ngOnInit(): void {}
}
