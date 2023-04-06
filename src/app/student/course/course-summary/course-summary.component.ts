import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-summary',
  templateUrl: './course-summary.component.html',
  styleUrls: ['./course-summary.component.scss']
})
export class CourseSummaryComponent implements OnInit {
  model: any;

  ngOnInit(): void {
    this.model =
    {
      'title': 'Card title',
      'description': 'With supporting text below as a natural lead-in to additional content.',
      'link': 'https://getmimo.com/web/50/overview',
      'block': false,
      'pass': 50,
      'sectionsDetails':
        [
          {
            'title': 'Card title',
            'description': 'With supporting text below as a natural lead-in to additional content.',
            'link': 'https://getmimo.com/web/50/overview',
            'block': false,
            'pass': 23,
            'lessons': [
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 10,
                'total': 10,
              }
              , {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 5,
                'total': 10,
              },
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 0,
                'total': 10,
              },
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 0,
                'total': 10,
              }
            ]

          },
          {
            'title': 'Card title 2 bla bla bla',
            'description': 'With supporting text below as a natural lead-in to additional content.',
            'link': 'https://getmimo.com/web/50/overview',
            'block': false,
            'pass': 70,
            'lessons': [
              {
                'title': 'Lesson 2, css',
                'icon': 'bi bi-filetype-css',
                'pass': 10,
                'total': 10,
              }
              , {
                'title': 'Lesson 1, css',
                'icon': 'bi bi-filetype-css',
                'pass': 5,
                'total': 10,
              }
            ]
          },
          {
            'title': 'Card title',
            'description': 'With supporting text below as a natural lead-in to additional content.',
            'link': 'https://getmimo.com/web/50/overview',
            'block': false,
            'pass': 100,
            'lessons': [
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 10,
                'total': 10,
              }
              , {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 5,
                'total': 10,
              },
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 0,
                'total': 10,
              },
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 0,
                'total': 10,
              }
            ]
          },
          {
            'title': 'Card title',
            'description': 'With supporting text below as a natural lead-in to additional content.',
            'link': 'https://getmimo.com/web/50/overview',
            'block': false,
            'pass': 100,
            'lessons': [
              {
                'title': 'Lesson 1, html',
                'icon': 'bi bi-filetype-css',
                'pass': 10,
                'total': 10,
              }
            ]
          },
        ]
    };
    this.model.sectionsDetails.forEach((element: any, index: any) => {
      element.isActive = true;
      element.index = index;
    });
  }

  onClick(index: any) {
    this.model.sectionsDetails.forEach((element: any) => {
      if (element.index == index)
        element.isActive = !element.isActive;
    });
  }
}
