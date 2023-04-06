import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, IChapter } from 'src/app/admin/shared/services/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  selectedChapter?: IChapter;
  chapters?: IChapter[];
  courseId: number;

  chapterClickFunction(courseId: number): void {
    this.selectedChapter = this.chapters?.find(chapter => chapter.id === courseId) ?? this.selectedChapter;
    this.router.navigate(['/teacher/courses', this.courseId, 'chapter', this.selectedChapter?.id]);
  };

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {
    let courseRouteId = this.route.snapshot.paramMap.get('id');

    if (courseRouteId) {
      this.courseId = Number(courseRouteId);
    }
    else {
      this.courseId = 0;
      this.router.navigate(['/teacher/courses']);
    }
    this.courseService.getChapters().subscribe((fetchedChapters) => {
      this.chapters = fetchedChapters;
      this.selectedChapter = this.chapters[0];
      this.router.navigate(['/teacher/courses', this.courseId, 'chapter', this.selectedChapter?.id]);
    })
  }
}
