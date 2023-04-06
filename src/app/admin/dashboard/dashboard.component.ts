import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  pages = [
    {
      href: "teacher/home",
      icon: "home",
      title: "Home"
    },
    {
      href: "teacher/courses",
      icon: "assignment",
      title: "Courses"
    },
    {
      href: "teacher/statistics",
      icon: "trending_up",
      title: "statistics"
    }];
  constructor() {
  }
}
