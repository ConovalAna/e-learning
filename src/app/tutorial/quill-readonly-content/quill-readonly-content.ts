import { Component, Input, OnInit } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Component({
  selector: 'app-quill-readonly-content',
  templateUrl: './quill-readonly-content.component.html',
  styleUrls: ['./quill-readonly-content.component.scss'],
})
export class QuillReadOnlyConentComponent implements OnInit {
  @Input() delta!: string | undefined;

  content!: any;

  ngOnInit() {
    if (this.delta) {
      const delta = JSON.parse(this.delta);
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      this.content = converter.convert();
    }
  }
}
