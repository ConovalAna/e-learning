import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import {
  UserCourseService,
  ICourse,
  CourseService,
} from 'src/app/shared/services/course';
import { ICourseEnrolmentView } from 'src/app/shared/services/course/course-enrolment.interface';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent implements OnInit {
  course!: ICourse;
  courseProgress!: ICourseEnrolmentView | undefined;
  progress!: number;
  chapters!: IChapter[];
  courseId: string;
  joined: boolean;

  joinCourseMutation = this.userCourseService.subscribeToCourse();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userCourseService: UserCourseService,
    private courseService: CourseService,
    private chapterService: ChapterService
  ) {
    this.courseId = '';
    this.joined = false;
    this.progress = 0;

    this.route.paramMap.subscribe((param) => {
      this.courseId = param.get('id') ?? '';
      this.loadCourseInfomation();
    });
  }

  ngOnInit(): void {}

  openDetailsPage() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }

  joinTheCourse() {
    this.joinCourseMutation.mutate(this.courseId);
  }

  openChapterDetailsPage(chapterId: string) {
    this.router.navigate(['chapter', chapterId], { relativeTo: this.route });
  }

  loadCourseInfomation() {
    this.userCourseService
      .getCourseSubscriptionProgress(this.courseId)
      .result$.subscribe((course) => {
        this.courseProgress = course.data;
        this.joined = !!course.data;
      });

    this.courseService
      .getCourseById(this.courseId)
      .subscribe((fetchedCourse) => {
        this.course = fetchedCourse;
      });

    this.chapterService
      .getAllChapters(this.courseId)
      .result$.subscribe((fetchedChapters) => {
        this.chapters = fetchedChapters.data ?? [];
      });
  }
}
