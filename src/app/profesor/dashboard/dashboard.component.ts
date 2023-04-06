import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private userService: UserFacade,

  ) { }

  logOut() { this.userService.logout() }

}
