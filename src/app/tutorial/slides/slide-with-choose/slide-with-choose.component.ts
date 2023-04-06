import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-with-choose',
  templateUrl: './slide-with-choose.component.html',
  styleUrls: ['./slide-with-choose.component.scss']
})
export class SlideWithChooseComponent implements OnInit {
  @Input() callbackFunction: any;
  @Input() model: any;
  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.model?.id));

  }

  constructor(private scroller: ViewportScroller) {

  }
}
