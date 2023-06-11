import { ViewportScroller } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { CourseService, ITestStatistic } from 'src/app/shared/services/course';
import { IPracticeSlide, ITestSlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slide-with-choose',
  templateUrl: './slide-with-choose.component.html',
  styleUrls: ['./slide-with-choose.component.scss'],
})
export class SlideWithChooseComponent implements OnInit {
  @Input() slide: ITestSlide | IPracticeSlide | undefined;
  @Input() index: number | undefined;
  @Input() isLast: boolean | undefined;
  @Input() totalPassTests: number | undefined;
  @Input() totalTests: number | undefined;
  @Input() testStatistics: ITestStatistic | undefined;

  @Output() continueToNext: EventEmitter<{ index: number; pass: boolean }> =
    new EventEmitter<{ index: number; pass: boolean }>();

  optionsCorrect: AnimationOptions = {
    path: '/assets/lottie/done.json',
    autoplay: true,
    loop: true,
  };
  optionsWrong: AnimationOptions = {
    path: '/assets/lottie/invalid.json',
    autoplay: true,
    loop: true,
  };

  optionsTestOverview = {
    path: '/assets/lottie/finish.json',
    autoplay: true,
    loop: true,
  };

  isLastLottie: boolean = false;
  answered: boolean = false;
  correctAnswer: boolean = false;
  radioAnswer: string = '';
  checkAnswers: { value: string; completed: boolean }[] = [];
  lastLotie = '/assets/lottie/finish2.json';

  constructor(
    private scroller: ViewportScroller,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.slide?.id));
  }

  checkCorrectAnswer() {
    this.answered = true;

    if (this.slide?.answerType === 0) {
      //radio
      //set response
      if (this.testStatistics !== null && this.testStatistics !== undefined) {
        this.testStatistics.answers = [this.radioAnswer];
      }

      this.correctAnswer = this.slide?.correctAnswers[0] === this.radioAnswer;
    } else if (this.slide?.answerType === 1) {
      //check box
      //set response
      if (this.testStatistics !== null && this.testStatistics !== undefined) {
        this.testStatistics.answers = this.checkAnswers
          ?.filter((i) => i.completed)
          .map((i) => i.value);
      }

      let correctAnswerStr = this.checkAnswers
        ?.filter((i) => i.completed)
        .map((i) => i.value)
        .toString();
      this.correctAnswer =
        this.slide?.correctAnswers?.toString() == correctAnswerStr;
    } else {
      this.correctAnswer = true;
    }

    //set response
    if (this.testStatistics !== null && this.testStatistics !== undefined) {
      this.courseService.addTestAnswer(
        this.testStatistics.courseId,
        this.testStatistics.testId,
        this.testStatistics
      );
    }
  }

  continueToNextSlide() {
    if (this.isLastLottie) {
      this.continueToNext.emit({
        index: this.index ?? 0,
        pass: this.correctAnswer,
      });
      return;
    }

    if (this.isLast) {
      this.isLastLottie = true;
      let point = this.correctAnswer ? 1 : 0;
      if ((this?.totalPassTests ?? 0) + point > (this?.totalTests ?? 0) * 0.7) {
        //good
        this.lastLotie = '/assets/lottie/finish3.json';
      } else if (
        (this?.totalPassTests ?? 0) + point >
        (this?.totalTests ?? 0) * 0.4
      ) {
        //can do better
        this.lastLotie = '/assets/lottie/learn-more.json';
      } // bad
      else {
        this.lastLotie = '/assets/lottie/fail1.json';
      }

      this.optionsTestOverview = {
        path: this.lastLotie ?? '/assets/lottie/finish3.json',
        autoplay: true,
        loop: true,
      };
    } else {
      this.continueToNext.emit({
        index: this.index ?? 0,
        pass: this.correctAnswer,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slide']) {
      this.checkAnswers = changes['slide']?.currentValue.answers.map(
        (value: any) => {
          return {
            value: value,
            completed: false,
          };
        }
      );
    }
  }

  hasIncompleteAnswers() {
    return !this.radioAnswer && !this.checkAnswers.some((i) => i.completed);
  }
}
