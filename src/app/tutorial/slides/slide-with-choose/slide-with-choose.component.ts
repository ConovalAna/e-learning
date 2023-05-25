import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { ITestSlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slide-with-choose',
  templateUrl: './slide-with-choose.component.html',
  styleUrls: ['./slide-with-choose.component.scss']
})
export class SlideWithChooseComponent implements OnInit {
  @Input() slide: ITestSlide | undefined;
  @Input() index: number | undefined;
  @Input() isLast: boolean | undefined;

  @Output() continueToNext: EventEmitter<number> = new EventEmitter<number>();

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

  isLastLottie: boolean = false;
  answered: boolean = false;
  correctAnswer: boolean = false;
  radioAnswer: string = '';
  checkAnswers: { value: string; completed: boolean }[] = [];

  constructor(private scroller: ViewportScroller) {

  }

  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.slide?.id));
    let random = Math.floor(Math.random() * 3) + 1;
    // if (random == 2) {
    //   this.options = {
    //     path: '/assets/lottie/finish2.json',
    //     autoplay: true,
    //     loop: true
    //   };
    // } else if (random == 3) {
    //   this.options = {
    //     path: '/assets/lottie/finish3.json',
    //     autoplay: true,
    //     loop: true
    //   };
    // }
  }

  checkCorrectAnswer() {
    this.answered = true;

    if (this.slide?.answerType === 0)//radio
    {
      debugger;
      this.correctAnswer = this.slide?.correctAnswers[0] === this.radioAnswer;
    }
    else if (this.slide?.answerType === 1) {
      debugger;

      let correctAnswerStr = this.checkAnswers?.filter(i => i.completed).map(i => i.value).toString();
      this.correctAnswer = this.slide?.correctAnswers?.toString() == correctAnswerStr;

    } else {
      this.correctAnswer = true;
    }
  }

  continueToNextSlide() {
    if (this.isLastLottie) {
      this.continueToNext.emit(this.index);
    }

    if (this.isLast) {
      this.isLastLottie = true;
      return;
    }
    this.continueToNext.emit(this.index);
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
    return !this.radioAnswer && !this.checkAnswers.some(i => i.completed);
  }

}
