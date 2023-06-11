import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  pages = [
    {
      href: 'administrator/teachers',
      icon: 'assignment',
      title: 'Teachers',
    },
  ];
  constructor(private userService: UserFacade) {}

  logout() {
    this.userService.logout();
  }
}
