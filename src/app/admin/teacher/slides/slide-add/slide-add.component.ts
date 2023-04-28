import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'src/app/admin/shared/quill-editor/quill-editor.component';

@Component({
  selector: 'app-slide-add',
  templateUrl: './slide-add.component.html',
  styleUrls: ['./slide-add.component.scss'],
})
export class SlideAddComponent {
  @ViewChild(QuillEditorComponent) child?: QuillEditorComponent;

  ngAfterViewInit() {
    // child is set
    this.child?.getContents();
  }

  onSave() {
    console.log(this.child?.getContents());
  }
}
