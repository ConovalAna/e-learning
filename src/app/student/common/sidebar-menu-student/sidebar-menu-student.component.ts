import { Component } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-sidebar-menu-student',
  templateUrl: './sidebar-menu-student.component.html',
  styleUrls: ['./sidebar-menu-student.component.scss'],
})
export class SidebarMenuStudentComponent {
  user: UserInfo | null = null;

  profileUrl: string | undefined = 'https://github.com/mdo.png';
  constructor(private userService: UserFacade) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user?.photoURL) this.profileUrl = user?.photoURL;
    });
  }
}
