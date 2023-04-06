import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lesson-input-answer',
  templateUrl: './course-lesson-input-answer.component.html',
  styleUrls: ['./course-lesson-input-answer.component.scss']
})
export class CourseLessonInputAnswerComponent implements OnInit {
  @Input() callbackFunction: any;
  @Input() model: any;
  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.model?.id));

  }

  constructor(private scroller: ViewportScroller) {

  }
}
