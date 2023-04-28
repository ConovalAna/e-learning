import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss'],
})
export class SlideThumbnailComponent implements OnInit {
  name = 'html2canvas capture in Angular';

  content!: any;

  constructor() {}

  ngOnInit() {
    const json =
      '{"ops":[{"insert":"Centered hero"},{"attributes":{"align":"center","header":1},"insert":"\\n"},{"insert":"Quickly design and customize responsive mobile-first sites with Bootstrap, the worlds most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins."},{"attributes":{"align":"center"},"insert":"\\n\\n\\n"},{"insert":"\\n"}]}';
    const delta = JSON.parse(json);

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    this.content = converter.convert();
  }

  clickme() {}
}
