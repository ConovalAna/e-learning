import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import * as imageResize from 'quill-image-resize-module';
import Quill from 'quill';
import Delta from 'quill-delta';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['image', 'link', 'video'], // add image, link, and video buttons
  [{ 'custom-button': 'Click me!' }], // add image by URL button                                   // add image by URL button
];

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
})
export class QuillEditorComponent implements AfterViewInit {
  @ViewChild('editor') editor!: ElementRef;
  quill!: Quill;

  //@Output() getContents: EventEmitter<Delta> = new EventEmitter<Delta>();

  ngAfterViewInit() {
    if (typeof imageResize.default !== 'undefined') {
      Quill.register('modules/imageResize', imageResize.default);
    }

    this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            'custom-button': () => alert('Button clicked!'), // handle custom button click event
          },
        },
        imageResize: {},
      },
      placeholder: 'Write something...',
      theme: 'snow',
    });
    const toolbar = this.quill.getModule('toolbar');
    const originalImageHandler = toolbar.handlers['image'];
    toolbar.addHandler('image', () => {
      const url = prompt('Enter image URL:');
      if (url) {
        this.quill.insertEmbed(
          this.quill?.getSelection()?.index ?? 0,
          'image',
          url,
          'user'
        );
      }
    });
  }

  getContents(): Delta {
    return this.quill.getContents() as Delta;
  }

  setContents(content: string) {
    const delta = JSON.parse(content);
    this.quill.setContents(delta);
  }
}
