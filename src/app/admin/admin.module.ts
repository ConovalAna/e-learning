import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SmartbyteMaterialModule } from '../smartbyte-material.module';
import { SharedModule } from '../shared/shared.module';
import { TeacherModule } from './teacher/teacher.module';

import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './administrator/admin-dashboard/admin-dashboard.component';
import { TeachersComponent } from './administrator/teachers/teachers.component';
import { TeachersTableComponent } from './administrator/teachers/teachers-table.component';
import { TeacherAddComponent } from './administrator/teachers/teacher-add/teacher-add.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    TeachersComponent,
    TeachersTableComponent,
    TeacherAddComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    TeacherModule,
    SharedModule,
    SmartbyteMaterialModule,
  ],
})
export class AdminModule {}
