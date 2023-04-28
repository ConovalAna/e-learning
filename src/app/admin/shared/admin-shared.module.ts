import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';

@NgModule({
  declarations: [QuillEditorComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [QuillEditorComponent],
  providers: [],
})
export class AdminSharedModule {}
