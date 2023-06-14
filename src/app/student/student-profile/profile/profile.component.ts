import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {
  IChallenge,
  IScore,
  QuestService,
} from 'src/app/shared/services/quests';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // This is the option that uses the package's AnimationOption interface
  options: AnimationOptions = {
    path: '/assets/lottie/125495-bubbles.json',
    autoplay: true,
    loop: true,
    //learning-opportunities.json'
    //online-learning-platform
  };
  challenges?: IChallenge[];
  user: UserInfo | null = null;
  score: IScore | undefined = undefined;
  todayScore: number | undefined = undefined;
  profileUrl: string | undefined = undefined;
  constructor(
    private userService: UserFacade,
    private questService: QuestService
  ) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user?.photoURL) this.profileUrl = user?.photoURL;
      if (user) {
        this.questService.getScoreChanges(user.uid).subscribe((score) => {
          this.score = score;
          this.getTodayScore();
        });
      }
    });

    this.questService.fetchChanllenges().result$.subscribe((fetchedQuests) => {
      this.challenges = fetchedQuests.data;
    });
  }

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

  getTodayScore() {
    if (this.score?.DailyScores?.length) {
      var today = new Date();
      let dayScore = this.score?.DailyScores.find(
        (ds) => today.toDateString() === ds.Date.toDate().toDateString()
      );
      if (dayScore) {
        this.todayScore = dayScore.Score;
      } else {
        this.todayScore = 0;
      }
    }
  }

  getText(questName: string) {
    switch (questName) {
      case 'TestModel':
        return 'Try to pass tests';
      case 'LessonModel':
        return 'Learn lessons';
      case 'QuestModel':
        return 'Try to pass all daily quests';
      default:
        return "You should do something but we don't know what";
    }
  }
}
