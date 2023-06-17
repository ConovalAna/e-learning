import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { UserInfo } from 'firebase/auth';
import { IScore, QuestService } from 'src/app/shared/services/quests';
import { UserFacade } from 'src/app/state/users';

interface ScoreStatistic {
  date: string;
  score: number;
}

@Component({
  selector: 'app-week-chart',
  templateUrl: './week-chart.component.html',
  styleUrls: ['./week-chart.component.scss'],
})
export class WeekChartComponent {
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      xAxis: {
        display: false,
        grid: {
          display: false,
        },
      },
      yAxis: {
        display: false,
      },
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: false, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#2D2F33',
        titleFont: {
          size: 18,
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  user: UserInfo | null = null;
  score: IScore | undefined = undefined;
  todayScore: number | undefined = undefined;
  scoreStatistics: ScoreStatistic[] = [];
  constructor(
    private userService: UserFacade,
    private questService: QuestService
  ) {
    this.userService.onAuthStateChanged$((user) => {
      this.user = user;
      if (user) {
        this.questService.getScoreChanges(user.uid).subscribe((score) => {
          this.score = score;
          this.scoreStatistics =
            score?.DailyScores?.map((ds) => {
              return { date: ds.Date.toDate().toDateString(), score: ds.Score };
            }) ?? [];
        });
      }
    });
  }

  getLabels() {
    return this.scoreStatistics?.map((ss) => ss.date) ?? [];
  }

  getChartData() {
    let chartData: ChartDataset[] = [
      {
        label: 'My day activity score',
        data: this.scoreStatistics?.map((ss) => ss.score) ?? [],
        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 8, // grows the point when hovered
        hoverBackgroundColor: '#2D2F33',
        pointRadius: 2,
        borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
        pointBackgroundColor: '#2D2F33',
        pointHoverBackgroundColor: '#2D2F33',

        borderWidth: 2, // main line width
        hoverBorderWidth: 0, // borders on points
        pointBorderWidth: 0, // removes POINT borders
        tension: 0.3, // makes line more squiggly
      },
    ];

    return chartData;
  }
}
