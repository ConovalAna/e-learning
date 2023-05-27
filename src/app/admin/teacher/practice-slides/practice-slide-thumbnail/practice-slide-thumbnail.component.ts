import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { IPracticeSlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-practice-slide-thumbnail',
  templateUrl: './practice-slide-thumbnail.component.html',
  styleUrls: ['./practice-slide-thumbnail.component.scss'],
})
export class PracticeSlideThumbnailComponent implements OnInit {
  @Input() slide?: IPracticeSlide;

  content!: string;

  ngOnInit() {
    if (this.slide) {
      const delta = JSON.parse(this.slide.delta);
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      this.content = converter.convert();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slide']) {
      const delta = JSON.parse(changes['slide']?.currentValue.delta);
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      this.content = converter.convert();
    }
  }
}
