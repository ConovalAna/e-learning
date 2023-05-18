import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { DragListComponent } from './drag-list/drag-list.component';
import {
  IgxIconModule,
  IgxListModule,
  IgxDragDropModule,
} from 'igniteui-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuillEditorComponent, DragListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IgxIconModule,
    IgxListModule,
    IgxDragDropModule,
  ],
  exports: [QuillEditorComponent, DragListComponent],
  providers: [],
})
export class AdminSharedModule {}
