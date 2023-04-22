import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChapter } from 'src/app/shared/services/chapter';

@Component({
  selector: 'app-chapter-card',
  templateUrl: './chapter-card.component.html',
  styleUrls: ['./chapter-card.component.scss']
})
export class ChapterCardComponent {
  @Input() chapter?: IChapter;
  @Input() isSelected: boolean;
  @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.isSelected = false;
  }

  onClick() {
    this.onClickEvent.emit(this.chapter?.id);
  }
}
