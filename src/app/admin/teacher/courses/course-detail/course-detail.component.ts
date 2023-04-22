import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { CourseService, ICourse } from 'src/app/shared/services/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  selectedChapter?: IChapter;
  chapters?: IChapter[];
  courseId: string;
  course?: ICourse;

  chapterClickFunction(chapterId: string): void {
    this.selectedChapter = this.chapters?.find(chapter => chapter.id === chapterId) ?? this.selectedChapter;
    this.router.navigate(['/teacher/courses', this.courseId, 'chapter', this.selectedChapter?.id]);
  };

  constructor(private route: ActivatedRoute, private router: Router,
    private courseService: CourseService, private chapterService: ChapterService) {
    let courseRouteId = this.route.snapshot.paramMap.get('courseId');

    if (courseRouteId) {
      this.courseId = courseRouteId;
    }
    else {
      this.courseId = "";
      this.router.navigate(['/teacher/courses']);
    }

    this.courseService.getCourseById(this.courseId).subscribe(course => {
      console.log(course);
      this.course = course;
    })
    this.chapterService.getAllChapters(this.courseId).subscribe((fetchedChapters) => {
      this.chapters = fetchedChapters;
      this.selectedChapter = this.chapters[0];
      this.router.navigate(['/teacher/courses', this.courseId, 'chapter', this.selectedChapter?.id]);
    })
  }
}
