import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuillEditorComponent } from './tutorial/quill-editor/quill-editor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    QuillEditorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule
  ]
})
export class ProfesorModule { }
