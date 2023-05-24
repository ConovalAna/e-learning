import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ITestSlide } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-test-slide-thumbnail',
  templateUrl: './test-slide-thumbnail.component.html',
  styleUrls: ['./test-slide-thumbnail.component.scss'],
})
export class TestSlideThumbnailComponent implements OnInit {
  @Input() slide?: ITestSlide;

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
