import { Component } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { IScore, QuestService } from 'src/app/shared/services/quests';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-header-auth-student',
  templateUrl: './header-auth-student.component.html',
  styleUrls: ['./header-auth-student.component.scss'],
})
export class HeaderAuthStudentComponent {
  user: UserInfo | null = null;
  score: IScore | undefined = undefined;
  todayScore: number | undefined = undefined;

  showScoreSuccess(score: number) {
    this.toastr.success(`You got ${score} points !`, 'Great !');
  }
  profileUrl: string | undefined = 'https://github.com/mdo.png';
  constructor(
    private userService: UserFacade,
    private questService: QuestService,
    private toastr: ToastrService
  ) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user?.photoURL) this.profileUrl = user?.photoURL;
      if (user) {
        this.questService.getScoreChanges(user.uid).subscribe((score) => {
          if (this.score && score) {
            this.showScoreSuccess(score?.TotalScore - this.score?.TotalScore);
          }
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
  logOut() {
    this.userService.logout();
  }
}
