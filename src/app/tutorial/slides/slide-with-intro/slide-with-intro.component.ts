import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.slide?.id));
  }

  constructor(private scroller: ViewportScroller) {}

  continueToNextSlide() {
    this.continueToNext.emit(this.index);
  }
}
