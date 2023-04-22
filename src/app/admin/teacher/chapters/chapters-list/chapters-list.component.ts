import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IChapter } from 'src/app/shared/services/chapter';
import { CourseService } from 'src/app/shared/services/course';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent {
  selectedChapter?: IChapter;
  chapters?: IChapter[];

  chapterClickFunction(courseId: string): void {
    this.selectedChapter = this.chapters?.find(chapter => chapter.id === courseId) ?? this.selectedChapter;
    this.router.navigate(['/teacher/courses', this.selectedChapter?.id]);
  };

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {
    // this.courseService.getChapters().subscribe((fetchedChapters) => {
    //   this.chapters = fetchedChapters;
    //   this.selectedChapter = this.chapters[0];
    //   this.router.navigate(['/teacher/courses', this.selectedChapter?.id]);
    // })
  }
}
