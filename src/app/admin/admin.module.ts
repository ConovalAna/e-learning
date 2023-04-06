import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SmartbyteMaterialModule } from '../smartbyte-material.module';
import { SharedModule } from '../shared/shared.module';
import { TeacherModule } from './teacher/teacher.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TeacherModule,
    SharedModule,
    SmartbyteMaterialModule
  ]
})
export class AdminModule { }
