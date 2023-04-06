import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  newcourse!: ICourse;
  courseId: string;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {

    let courseRouteId = this.route.snapshot.paramMap.get('id');

    if (courseRouteId) {
      this.courseId = courseRouteId;
    } else {
      this.courseId = "";
    }
    console.log(courseRouteId);

    this.courseService.getCourseById(this.courseId).subscribe((fetchedCourses) => {
      this.newcourse = fetchedCourses;

      console.log(fetchedCourses);
      console.log(this.newcourse);
    })
  }


  sections: any = [];
  course: any;
  ngOnInit(): void {
    this.sections = [
      {
        'title': 'Card title',
        'description': 'With supporting text below as a natural lead-in to additional content.',
        'link': 'https://getmimo.com/web/50/overview',
        'block': false,
        'pass': 100,
      },
      {
        'title': 'Card title',
        'description': 'With supporting text below as a natural lead-in to additional content.',
        'link': 'https://getmimo.com/web/50/overview',
        'block': false,
        'pass': 13,
      },
      {
        'title': 'Card title',
        'description': 'With supporting text below as a natural lead-in to additional content.',
        'link': 'https://getmimo.com/web/50/overview',
        'block': true,
        'pass': 0,
      },
      {
        'title': 'Card title',
        'description': 'With supporting text below as a natural lead-in to additional content.',
        'link': 'https://getmimo.com/web/50/overview',
        'block': true,
        'pass': 0,
      }
    ];
    this.course = {
      imageSrc: "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/google-images-rechercher.jpg",
      title: "Artificial inteligence",
      shortDescription: "This is a longer card with supporting text below as a natural lead-in to additional content.",
    }
  }



  openDetailsPage() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }

  joinTheCourse() {

  }

}
