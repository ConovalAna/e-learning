import { Component, OnInit } from '@angular/core';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Component({
  selector: 'app-quill-readonly-content',
  templateUrl: './quill-readonly-content.component.html',
  styleUrls: ['./quill-readonly-content.component.scss']
})
export class QuillReadOnlyConentComponent implements OnInit {
  content!: any;

  ngOnInit() {

    const json = '{"ops":[{"insert":"Centered hero"},{"attributes":{"align":"center","header":1},"insert":"\\n"},{"insert":"Quickly design and customize responsive mobile-first sites with Bootstrap, the worlds most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins."},{"attributes":{"align":"center"},"insert":"\\n\\n\\n"},{"insert":"\\n"}]}';
    const delta = JSON.parse(json);

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    this.content = converter.convert();
  }

}
