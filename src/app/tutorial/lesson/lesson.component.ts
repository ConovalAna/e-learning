import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  slides: any;

  myCallbackFunction: (args: any) => void = (index: number) => {
    //TODO check for last
    this.slides[index + 1].pressedContinue = true;
    document.getElementById('1')?.scrollIntoView();
    console.log(document.getElementById('1'));
  };

  ngOnInit(): void {
    this.slides = [
      {
        type: 'info',
        pressedContinue: true,
        id: 0,
      },
      {
        type: 'right-answer',
        pressedContinue: false,
        id: 1,
      },
      {
        type: 'input-answer',
        pressedContinue: false,
        id: 2,
      },
    ];
  }
}
