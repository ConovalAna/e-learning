import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { UserCourseService } from 'src/app/shared/services/course';
import {
  ICourseEnrolmentView,
  ILessonProgressView,
} from 'src/app/shared/services/course/course-enrolment.interface';

interface ILessonViewProcess extends ILessonProgressView {
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
  courseProgress!: ICourseEnrolmentView | undefined;
  lessonsProgress: ILessonViewProcess[] = [];
  lessonCompleted = 0;

  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private userCourseService: UserCourseService
  ) {
    let courseRouteId = this.route.snapshot.paramMap.get('id');
    let chapterRouteId = this.route.snapshot.paramMap.get('chapterId');

    this.userCourseService
      .getCourseSubscriptionProgress(courseRouteId ?? '')
      .result$.subscribe((course) => {
        this.courseProgress = course.data;
        this.lessonsProgress =
          this.courseProgress?.lessonsProgress
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
  }
}
