import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { ISlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slide-with-intro',
  templateUrl: './slide-with-intro.component.html',
  styleUrls: ['./slide-with-intro.component.scss'],
})
export class SlideWithIntroComponent {
  @Input() slide: ISlide | undefined;
  @Input() index: number | undefined;
  @Input() isLast: boolean | undefined;

  @Output() continueToNext: EventEmitter<number> = new EventEmitter<number>();

  options: AnimationOptions = {
    path: '/assets/lottie/finish.json',
    autoplay: true,
    loop: true
  };

  isLastLottie: boolean = false;

  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.slide?.id));
    debugger;
    let random = Math.floor(Math.random() * 3) + 1;
    if (random == 2) {
      this.options = {
        path: '/assets/lottie/finish2.json',
        autoplay: true,
        loop: true
      };
    } else if (random == 3) {
      this.options = {
        path: '/assets/lottie/finish3.json',
        autoplay: true,
        loop: true
      };
    }
  }

  constructor(private scroller: ViewportScroller) { }

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
}
