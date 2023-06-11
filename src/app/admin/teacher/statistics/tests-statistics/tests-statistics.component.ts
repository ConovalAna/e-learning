import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { zip } from 'rxjs';
import { CourseService, ITestStatistic } from 'src/app/shared/services/course';
import {
  IGroupedSlideStatistic,
  ITestSlide,
} from 'src/app/shared/services/slide';
import { TestService } from 'src/app/shared/services/test';

@Component({
  selector: 'app-tests-statistics',
  templateUrl: './tests-statistics.component.html',
  styleUrls: ['./tests-statistics.component.scss'],
})
export class TestsStatisticsComponent {
  panelOpenState = false;
  coursesTests: any;
  coursesTestsStatistics: ITestStatistic[] = [];
  preparedStatistics: any[] = [];
  testGroupedStatiscs: any = {};
  private _currentCourseId?: string;

  @Input()
  get currentCourseId(): string | undefined {
    return this._currentCourseId;
  }
  set currentCourseId(currentCourseId: string | undefined) {
    this._currentCourseId = currentCourseId;
    if (currentCourseId) {
      let coursesTests$ = this.courseService.getCoursesTests(currentCourseId);
      // .subscribe((data) => {
      //     this.coursesTests = data
      //       .flatMap((i) => i)
      //       .reduce(function (r, a) {
      //         r[a.chapterId] = r[a.chapterId] || [];
      //         r[a.chapterId].push(a);
      //         return r;
      //       }, Object.create(null));

      //     // this.testGroupedStatiscs = data
      //     //   .flatMap((i) => i)
      //     //   .reduce(function (r, a) {
      //     //     r[a.testId] = r[a.testId] || [];
      //     //     r[a.testId].push(a);
      //     //     return r;
      //     //   }, Object.create(null));
      //   });

      let coursesTestsStatistics$ =
        this.courseService.getCoursesTestsStatistics(currentCourseId);
      // .subscribe((data) => {
      //   let testStatistics = data.flatMap((i) => i);
      //   this.testService
      //     .prepareTestStatistics(testStatistics)
      //     .subscribe((stat) => {
      //       this.preparedStatistics = stat;
      //     });
      // });

      zip([coursesTestsStatistics$, coursesTests$]).subscribe((data) => {
        let [coursesTestsStatistics, coursesTests] = data;
        this.coursesTests = coursesTests
          .flatMap((i) => i)
          .reduce(function (r, a) {
            r[a.chapterId] = r[a.chapterId] || [];
            r[a.chapterId].push(a);
            return r;
          }, Object.create(null));
        let flatCoursesTests = coursesTests.flatMap((i) => i);
        let testStatistics = coursesTestsStatistics.flatMap((i) => i);
        this.testService
          .prepareTestStatistics(testStatistics, flatCoursesTests)
          .subscribe((stat) => {
            this.preparedStatistics = stat;
          });
      });
    }
  }

  constructor(
    private courseService: CourseService,
    private testService: TestService
  ) {}

  objectKeys(obj: any) {
    if (obj) return Object.keys(obj);
    else return [];
  }

  baseChartData: ChartDataset[] = [
    {
      label: 'my day activity %',
      data: [100, 95, 30, 20, 60, 80],
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered
      pointRadius: 2,
      backgroundColor: '#e0f2f1',
      hoverBackgroundColor: '#e0f2f1',
      borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      borderWidth: 0, // main line width
      hoverBorderWidth: 1, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0.3, // makes line more squiggly
    },
  ];

  chartLabels: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Frinday',
    'Saturday',
  ];

  buildQuestionsDataSet(question: any) {
    let chartDat: ChartDataset[] = [
      {
        label: 'Responses ',
        data: [
          ...this.objectKeys(question.answersCount).map(
            (ac) => question.answersCount[ac]
          ),
        ],
        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 8, // grows the point when hovered
        pointRadius: 2,
        backgroundColor: '#e0f2f1',
        hoverBackgroundColor: '#e0f2f1',
        borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
        borderWidth: 0, // main line width
        hoverBorderWidth: 1, // borders on points
        pointBorderWidth: 0, // removes POINT borders
        tension: 0.3, // makes line more squiggly
        minBarLength: 7,
      },
    ];

    return chartDat;
  }

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
        bodyColor: '#111111',
        bodyFont: {
          size: 13,
        },
      },
    },
  };
}
