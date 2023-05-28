import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, concat } from 'rxjs';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import {
  UserCourseService,
  ICourse,
  CourseService,
} from 'src/app/shared/services/course';
import { ICourseEnrolmentView } from 'src/app/shared/services/course/course-enrolment.interface';

interface IChapterProgress {
  chapter: IChapter;
  progress: number;
}
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
  chapterProgress: IChapterProgress[] = [];
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
    this.joined = true;
    this.progress = 0;

    this.route.paramMap.subscribe((param) => {
      this.courseId = param.get('id') ?? '';
      this.loadCourseInfomation();
    });
  }

  ngOnInit(): void {
    this.joined = true;
  }

  openDetailsPage() {
    this.router.navigate(['summary'], { relativeTo: this.route });
  }

  joinTheCourse() {
    this.joinCourseMutation.mutate(this.courseId);
  }

  openChapterDetailsPage(chapterId: string | undefined) {
    this.router.navigate(['chapter', chapterId], { relativeTo: this.route });
  }

  loadCourseInfomation() {
    this.userCourseService
      .getCourseSubscriptionProgress(this.courseId)
      .result$.subscribe((course) => {});

    this.courseService
      .getCourseById(this.courseId)
      .subscribe((fetchedCourse) => {
        this.course = fetchedCourse;
      });

    this.chapterService
      .getAllChapters(this.courseId)
      .result$.subscribe((fetchedChapters) => {
        this.chapters = fetchedChapters.data ?? [];

        // if(this.chapters)
        // this.chapters
      });

    combineLatest([
      this.userCourseService.getCourseSubscriptionProgress(this.courseId)
        .result$,
      this.chapterService.getAllChapters(this.courseId).result$,
    ]).subscribe((values) => {
      this.courseProgress = values[0].data;
      this.joined = !!values[0].data;
      this.chapters = values[1].data ?? [];
      let chapterProgress: IChapterProgress[] = [];
      this.chapters?.forEach((chapter) => {
        let chProg = this.courseProgress?.chapterProgress?.find(
          (cp) => cp.chapterId === chapter.id
        );
        chapterProgress.push({
          chapter: chapter,
          progress: chProg?.progress ?? 0,
        });
      });

      this.chapterProgress = [...chapterProgress];
    });
  }
}
