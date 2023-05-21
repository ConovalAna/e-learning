import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  emailstring = "mailto:lazarenco.ana.f7e@student.ucv.ro?Subject=E-Learn suport email &body=User name:  %0DQuestion:";
  options: AnimationOptions = {
    path: '/assets/lottie/thinking.json',
    autoplay: true,
    loop: true
  };

  optionsMicrolearning: AnimationOptions = {
    path: '/assets/lottie/80356-online-learning.json',
    autoplay: true,
    loop: true
  };

  constructor() { }

  ngOnInit(): void { }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: any): void {

  }

}
