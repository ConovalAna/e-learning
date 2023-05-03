import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ISlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss'],
})
export class SlideThumbnailComponent implements OnInit {
  @Input() slide?: ISlide;

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
