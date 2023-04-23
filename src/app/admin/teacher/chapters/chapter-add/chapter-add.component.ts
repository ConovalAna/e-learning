import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService, IChapter } from 'src/app/shared/services/chapter';
import { CourseService } from 'src/app/shared/services/course';

@Component({
  selector: 'app-chapter-add',
  templateUrl: './chapter-add.component.html',
  styleUrls: ['./chapter-add.component.scss']
})
export class ChapterAddComponent {
  chapter: IChapter = {
    id: '',
    name: '',
    description: ''
  };

  courseId = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private chapterService: ChapterService) {
    this.courseId = this.route.snapshot.paramMap.get('courseId') ?? '';
  }

  addChapter() {
    this.chapterService.addChapter(this.courseId, this.chapter).subscribe(result => {
      if (result)
        this.router.navigate(['/teacher/courses', this.courseId]);

    })
  }

}
