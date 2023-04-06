import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.scss']
})
export class CourseLessonComponent implements OnInit {
  @Input() callbackFunction: (args: any) => void = () => { };
  @Input() model: any;

  ngOnInit(): void {
    console.log(this.model);
  }
}
