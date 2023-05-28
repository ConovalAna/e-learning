import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { UserCourseService } from 'src/app/shared/services/course';
import {
  IChapterProgress,
  ILessonProgressView,
  ITestProgressView,
} from 'src/app/shared/services/course/course-enrolment.interface';
import { IPractice, PracticeService } from 'src/app/shared/services/practice';

interface ILessonViewProcess extends ILessonProgressView {
  canView: boolean;
}

interface ITestViewProcess extends ITestProgressView {
  canView: boolean;
}

@Component({
  selector: 'app-chapter-section',
  templateUrl: './chapter-section.component.html',
  styleUrls: ['./chapter-section.component.scss'],
})
export class ChapterSectionComponent {
  chapter!: IChapter | undefined;
  courseId!: string;
  chapterProgress!: IChapterProgress | undefined;
  lessonsProgress: ILessonViewProcess[] = [];
  testsProgress: ITestViewProcess[] = [];
  practices: IPractice[] = [];
  lessonCompleted = 0;
  testCompleted = 0;

  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private userCourseService: UserCourseService,
    private practiceService: PracticeService
  ) {
    let courseRouteId = this.route.snapshot.paramMap.get('id');
    let chapterRouteId = this.route.snapshot.paramMap.get('chapterId');

    this.userCourseService
      .getChapterSubscriptionProgress(courseRouteId ?? '', chapterRouteId ?? '')
      .result$.subscribe((course) => {
        this.chapterProgress = course.data;
        this.lessonsProgress =
          this.chapterProgress?.lessonsProgress
            ?.filter(
              (lp) =>
                lp.chapterId === chapterRouteId && lp.currentNumberOfSlides > 0
            )
            .map((cp, index, array) => {
              let canView = false;
              if (index === 0) {
                canView = true;
              } else if (array[index - 1]?.progress === 100) {
                canView = true;
              }
              return { ...cp, canView: canView };
            }) ?? [];

        this.lessonCompleted = this.lessonsProgress.filter(
          (x) => x.progress === 100
        ).length;
      });

    this.chapterService
      .getAllChapters(courseRouteId ?? '')
      .result$.subscribe((fetchedChapters) => {
        this.chapter = fetchedChapters.data?.find(
          (chapter) => chapter.id === chapterRouteId
        );
      });

    this.userCourseService
      .getChapterTestsProgress(courseRouteId ?? '', chapterRouteId ?? '')
      .result$.subscribe((tests) => {
        this.testsProgress =
          tests?.data
            ?.filter((lp) => lp.chapterId === chapterRouteId)
            .map((cp, index, array) => {
              let canView = false;
              if (index === 0) {
                canView = true;
              } else if (array[index - 1]?.pass === true) {
                canView = true;
              }
              return { ...cp, canView: canView };
            }) ?? [];

        this.testCompleted = this.testsProgress.filter((x) => x.pass).length;
      });

    this.practiceService
      .getAllPracticeForChapter(chapterRouteId ?? '')
      .subscribe((practices) => {
        this.practices = practices;
      });
  }
}
