import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss']
})
export class CourseLessonsComponent implements OnInit {
  model: any;

  myCallbackFunction: (args: any) => void =
    (index: number) => {
      //TODO check for last
      this.model[index + 1].pressedContinue = true;
      document.getElementById('1')?.scrollIntoView();
      console.log(document.getElementById('1'));
    };

  ngOnInit(): void {
    this.model = [
      {
        'type': 'info',
        'pressedContinue': true,
        'id': 0
      },
      {
        'type': 'right-answer',
        'pressedContinue': false,
        'id': 1
      },
      {
        'type': 'input-answer',
        'pressedContinue': false,
        'id': 2
      }
    ]
  }
}
