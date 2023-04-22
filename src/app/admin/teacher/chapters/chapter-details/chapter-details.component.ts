import { Component, Input } from '@angular/core';
import { IChapter } from 'src/app/shared/services/chapter';

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.scss']
})
export class ChapterDetailsComponent {
  @Input() chapter: IChapter | undefined;

}
