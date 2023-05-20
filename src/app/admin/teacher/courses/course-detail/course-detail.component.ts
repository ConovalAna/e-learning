import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { CourseService, ICourse } from 'src/app/shared/services/course';
import { ChapterAddComponent } from '../../chapters/chapter-add/chapter-add.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent {
  selectedChapter?: IChapter;
  chapters?: IChapter[];
  courseId: string;
  course: ICourse = {
    id: '',
    name: '',
    imageUrl:
      'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg',
    shortDescription: '',
    longDescription: '',
    duration: 0,
    requirements: '',
    achievements: '',
    level: 0,
    numberOfLessons: 0,
    visible: true,
    archived: false,
  };
  isCourseEditMode: boolean = false;
  updateCourseMutation = this.courseService.updateCourseByTeacher();

  chapterClickFunction(chapterId: string): void {
    this.selectedChapter =
      this.chapters?.find((chapter) => chapter.id === chapterId) ??
      this.selectedChapter;
    this.router.navigate([
      '/teacher/courses',
      this.courseId,
      'chapters',
      this.selectedChapter?.id,
    ]);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private chapterService: ChapterService,
    public dialog: MatDialog
  ) {
    let courseRouteId = this.route.snapshot.paramMap.get('courseId');

    if (courseRouteId) {
      this.courseId = courseRouteId;
    } else {
      this.courseId = '';
      this.router.navigate(['/teacher/courses']);
    }

    this.courseService.getCourseById(this.courseId).subscribe((course) => {
      console.log(course);
      this.course = course;
    });
    this.chapterService
      .getAllChapters(this.courseId)
      .result$.subscribe((fetchedChapters) => {
        this.chapters = fetchedChapters.data ?? [];
        if (!this.chapters?.length) {
          return;
        }
        this.selectedChapter = this.chapters[0];
        this.router.navigate([
          '/teacher/courses',
          this.courseId,
          'chapters',
          this.selectedChapter?.id,
        ]);
      });
  }

  goBack() {
    this.router.navigate(['/teacher/courses']);
  }

  changeCourseEditMode() {
    this.isCourseEditMode = !this.isCourseEditMode;
  }

  updateCourse(course: ICourse) {
    this.updateCourseMutation.mutate(course).then((result) => {
      this.courseService.getCourseById(this.courseId).subscribe((course) => {
        console.log(course);
        this.course = course;
        this.isCourseEditMode = false;
      });
    });
  }

  openAddChapterDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(ChapterAddComponent, {
      data: { courseId: this.courseId, isEditMode: false },
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => { });
    });
  }
}
