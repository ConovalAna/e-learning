import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lesson-right-answer',
  templateUrl: './course-lesson-right-answer.component.html',
  styleUrls: ['./course-lesson-right-answer.component.scss']
})
export class CourseLessonRightAnswerComponent implements OnInit {
  @Input() callbackFunction: any;
  @Input() model: any;
  ngOnInit(): void {
    this.scroller.scrollToAnchor(String(this.model?.id));

  }

  constructor(private scroller: ViewportScroller) {

  }
}
