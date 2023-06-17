import { Component, Input } from '@angular/core';
import {
  CourseService,
  ICourse,
  IUserCourseStatistic,
  UserCourseService,
} from 'src/app/shared/services/course';
import { Chart } from 'chart.js';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-subscription-chart',
  templateUrl: './subscription-chart.component.html',
  styleUrls: ['./subscription-chart.component.scss'],
})
export class SubscriptionChartComponent {
  private _currentCourseId?: string;
  private _courseStatistics: IUserCourseStatistic[] = [];
  courses?: ICourse[];

  @Input()
  get currentCourseId(): string | undefined {
    return this._currentCourseId;
  }
  set currentCourseId(currentCourseId: string | undefined) {
    this._currentCourseId = currentCourseId;
    if (currentCourseId)
      this.userCourseService
        .getUserCourseStatistics(currentCourseId)
        .result$.subscribe((result) => {
          this._courseStatistics = result.data ?? [];
        });
  }

  constructor(private userCourseService: UserCourseService) {}

  chartOptions: ChartOptions = {};

  buildDataRecord(statistics: IUserCourseStatistic[]) {
    var daysRecord: Record<string, number> = {};
    if (!statistics.length) return daysRecord;
    let minDate = new Date(statistics[0].joinDate);
    let maxDate = new Date(statistics[0].joinDate);
    statistics
      .map((stat) => new Date(stat.joinDate))
      .forEach((date) => {
        if (minDate > date) minDate = date;
        if (maxDate < date) maxDate = date;
      });
    debugger;
    var daylist = this.getDaysArray(minDate, maxDate);
    var daysRecord: Record<string, number> = {};
    daylist
      .map((v) => v.toISOString().slice(0, 10))
      .forEach((day) => {
        daysRecord[day] = statistics.filter((stat) =>
          stat.joinDate.includes(day)
        ).length;
      });
    daysRecord;
    return daysRecord;
  }

  getLabels() {
    var record = this.buildDataRecord(this._courseStatistics);
    return Object.keys(record);
  }

  getChartData() {
    var record = this.buildDataRecord(this._courseStatistics);
    let chartData: ChartDataset[] = [
      {
        label: 'Course subscriptions',
        data: Object.keys(record).map((key) => record[key]),
        borderColor: '#2D2F33',
        backgroundColor: '#2D2F33',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ];
    return chartData;
  }

  getDaysArray(start: Date, end: Date) {
    var arr = [],
      dt = new Date(start);
    end.setDate(end.getDate() + 1);
    while (dt < end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }
}
