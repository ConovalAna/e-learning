import { Component } from '@angular/core';

@Component({
  selector: 'app-slides-list',
  templateUrl: './slides-list.component.html',
  styleUrls: ['./slides-list.component.scss']
})
export class SlidesListComponent {

  slides = [
    {
      id: 1,
      name: "Slide name..."
    },
    {
      id: 2,
      name: "Slide name..."
    },
    {
      id: 3,
      name: "Slide name..."
    },
    {
      id: 3,
      name: "Slide name..."
    },
  ];
}
