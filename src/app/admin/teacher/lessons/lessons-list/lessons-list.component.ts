import { Component } from '@angular/core';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent {
  lessons = [
    {
      id: 1,
      name: "Lesson name..."
    },
    {
      id: 2,
      name: "Lesson name..."
    },
    {
      id: 3,
      name: "Lesson name..."
    },
    {
      id: 3,
      name: "Lesson name..."
    },
  ];
}
