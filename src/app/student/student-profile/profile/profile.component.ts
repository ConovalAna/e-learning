import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // This is the option that uses the package's AnimationOption interface
  options: AnimationOptions = {
    path: '/assets/lottie/125495-bubbles.json',
    autoplay: true,
    loop: true,
    //learning-opportunities.json'
    //online-learning-platform
  };

  user: UserInfo | null = null;

  profileUrl: string | undefined = undefined;
  constructor(private userService: UserFacade) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user?.photoURL) this.profileUrl = user?.photoURL;
    });
  }

  ngOnInit(): void {}

  // This is the component function that binds to the animationCreated event from the package
  onAnimate(animationItem: any): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const animationWidth = animationItem.anim.data.w;
    const animationHeight = animationItem.anim.data.h;

    if (screenWidth % 2 === 0) {
      // Dimensiuni pare, ajustează dimensiunile Lottie-ului
      const scaleX = screenWidth / animationWidth;
      const scaleY = screenHeight / animationHeight;
      const scale = Math.min(scaleX, scaleY);
      animationItem['container'].style.transform = `scale(${scale})`;
      animationItem['container'].style.left = `${
        (screenWidth - animationWidth * scale) / 2
      }px`;
      animationItem['container'].style.top = `${
        (screenHeight - animationHeight * scale) / 2
      }px`;
    }
  }
}
