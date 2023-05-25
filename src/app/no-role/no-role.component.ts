import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { UserFacade } from '../state/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-role',
  templateUrl: './no-role.component.html',
  styleUrls: ['./no-role.component.scss'],
})
export class NoRoleComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/page-not-found.json',
    autoplay: true,
    loop: true,
  };

  constructor(private userService: UserFacade, public router: Router) {}

  logOut() {
    this.userService.logout().subscribe((user) => {
      if (!user?.auth?.uid) {
        this.router.navigate(['sign-in']);
      }
    });
  }

  // This is the component function that binds to the animationCreated event from the package
  onAnimate(animationItem: any): void {}
}
