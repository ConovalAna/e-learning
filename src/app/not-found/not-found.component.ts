import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/page-not-found.json',
    autoplay: true,
    loop: true,
  };
}
