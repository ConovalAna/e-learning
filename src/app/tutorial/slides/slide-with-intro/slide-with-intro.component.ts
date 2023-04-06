import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-with-intro',
  templateUrl: './slide-with-intro.component.html',
  styleUrls: ['./slide-with-intro.component.scss']
})
export class SlideWithIntroComponent {
  @Input() callbackFunction: any;
  @Input() model: any;
  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.model?.id));

  }

  constructor(private scroller: ViewportScroller) {
  }
}
