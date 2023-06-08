import { Component } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-header-auth-student',
  templateUrl: './header-auth-student.component.html',
  styleUrls: ['./header-auth-student.component.scss'],
})
export class HeaderAuthStudentComponent {
  user: UserInfo | null = null;

  profileUrl: string | undefined = 'https://github.com/mdo.png';
  constructor(private userService: UserFacade) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user?.photoURL) this.profileUrl = user?.photoURL;
    });
  }
  logOut() {
    this.userService.logout();
  }
}
