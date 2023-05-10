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

  course!: ICourse;
  progress!: number;
  chapters!: IStudentChapter[];
  courseId: string;
  joined: boolean;

  joinCourseMutation = this.courseService.subscribeToCourse();

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private chapterService: ChapterService) {

    this.courseId = '';
    this.joined = false;
    this.progress = 0;

    this.route.paramMap.subscribe((param) => {
      this.courseId = param.get('id') ?? '';
      this.loadCourseInfomation();
    });
  }

  ngOnInit(): void {

  }

  openDetailsPage() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }

  joinTheCourse() {
    this.joinCourseMutation.mutate(this.courseId).then(result => {
      this.joined = true;
    })
  }

  openChapterDetailsPage(chapterId: string) {
    this.router.navigate(['chapter', chapterId], { relativeTo: this.route });
  }

  loadCourseInfomation() {

    this.courseService.getSubscribedCourses().result$.subscribe((fetchedCourses) => {
      let foundCourse = fetchedCourses.data?.find(course => course.courseId === this.courseId);

      if (!!foundCourse) {
        this.joined = true;
        this.progress = foundCourse.progress ?? 0;
      }
    })

    this.courseService.getCourseById(this.courseId).subscribe((fetchedCourses) => {
      this.course = fetchedCourses;
    })

    this.chapterService.getAllStudentChapters(this.courseId).subscribe((fetchedChapters) => {
      this.chapters = fetchedChapters;
    })
  }
}
