import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teacher'
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: '**',
        redirectTo: 'teacher'
      }
    ],
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
