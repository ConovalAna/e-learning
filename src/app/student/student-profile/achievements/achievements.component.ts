import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { IScore, QuestService } from 'src/app/shared/services/quests';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {
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
}
