import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // This is the option that uses the package's AnimationOption interface  
  options: AnimationOptions = {
    path: '/assets/lottie/learning-opportunities.json'
    //online-learning-platform

  };

  constructor() { }

  ngOnInit(): void { }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
