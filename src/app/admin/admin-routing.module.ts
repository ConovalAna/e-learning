import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherGuard } from '../shared/guard/teacher.guard';
import { AdminDashboardComponent } from './administrator/admin-dashboard/admin-dashboard.component';
import { TeachersComponent } from './administrator/teachers/teachers.component';
import { AdminGuard } from '../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teacher',
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
        canActivate: [TeacherGuard],
      },
    ],
  },
  {
    path: 'administrator',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teachers',
      },
      {
        path: 'teachers',
        component: TeachersComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
