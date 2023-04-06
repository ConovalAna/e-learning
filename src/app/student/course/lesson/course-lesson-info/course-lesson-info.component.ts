import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lesson-info',
  templateUrl: './course-lesson-info.component.html',
  styleUrls: ['./course-lesson-info.component.scss']
})
export class CourseLessonInfoComponent implements OnInit {
  @Input() callbackFunction: any;
  @Input() model: any;
  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.model?.id));

  }

  constructor(private scroller: ViewportScroller) {
  }
}
