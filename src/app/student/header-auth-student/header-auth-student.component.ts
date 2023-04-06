import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-header-auth-student',
  templateUrl: './header-auth-student.component.html',
  styleUrls: ['./header-auth-student.component.scss']
})
export class HeaderAuthStudentComponent {
  constructor(
    private userService: UserFacade,
  ) { }

  logOut() { this.userService.logout() }
}
