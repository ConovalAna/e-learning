import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuillEditorComponent } from './tutorial/quill-editor/quill-editor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/quill', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'quill', component: QuillEditorComponent },


    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
