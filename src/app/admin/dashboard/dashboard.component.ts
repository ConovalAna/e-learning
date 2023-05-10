import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  pages = [
    {
      href: 'teacher/home',
      icon: 'home',
      title: 'Home',
    },
    {
      href: 'teacher/courses',
      icon: 'assignment',
      title: 'Courses',
    },
    {
      href: 'teacher/statistics',
      icon: 'trending_up',
      title: 'statistics',
    },
  ];
  constructor(private userService: UserFacade) {}

  logout() {
    this.userService.logout();
  }
}
