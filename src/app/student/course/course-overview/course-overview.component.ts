import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter, IStudentChapter } from 'src/app/shared/services/chapter';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  newcourse!: ICourse;
  chapters!: IStudentChapter[];
  courseId: string;
  courseImage!: string;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private chapterService: ChapterService) {

    let courseRouteId = this.route.snapshot.paramMap.get('id');
    //TODO update image 
    this.courseImage = "https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/google-images-rechercher.jpg";

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

    this.chapterService.getAllStudentChapters(this.courseId).subscribe((fetchedChapters) => {
      this.chapters = fetchedChapters;

      console.log(fetchedChapters);
      console.log(this.chapters);
    })
  }

  ngOnInit(): void {

  }



  openDetailsPage() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }

  joinTheCourse() {

  }

  openChapterDetailsPage(chapterId: string) {
    console.log(chapterId);
    this.router.navigate(['chapter', chapterId], { relativeTo: this.route });
  }


}
