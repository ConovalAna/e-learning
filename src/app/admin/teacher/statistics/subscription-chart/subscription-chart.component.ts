import { Component, Input } from '@angular/core';
import {
  CourseService,
  ICourse,
  IUserCourseStatistic,
  UserCourseService,
} from 'src/app/shared/services/course';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-subscription-chart',
  templateUrl: './subscription-chart.component.html',
  styleUrls: ['./subscription-chart.component.scss'],
})
export class SubscriptionChartComponent {
  private _currentCourseId?: string;
  private _courseStatistics: IUserCourseStatistic[] = [];
  courses?: ICourse[];
  public chart?: Chart;

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
          this.updateChartData();
        });
  }

  constructor(private userCourseService: UserCourseService) {}

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

  updateChartData() {
    var record = this.buildDataRecord(this._courseStatistics);
    const data = {
      labels: Object.keys(record),
      datasets: [
        {
          label: 'Course subscription %',
          data: Object.keys(record).map((key) => record[key]),
          borderColor: '#2D2F33',
          backgroundColor: '#2D2F33',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    };
    if (this.chart) {
      console.log(data);
      this.chart.data = data;
      this.chart.update('reset');
    }
  }

  createChart() {
    var daylist = this.getDaysArray(
      new Date('2018-05-01'),
      new Date('2018-05-07')
    );
    var dayListStrings = daylist.map((v) => v.toISOString().slice(0, 10));
    const data = {
      labels: dayListStrings,
      datasets: [
        {
          label: 'Course subscription %',
          data: [100, 95, 30, 20, 60, 80],
          borderColor: '#2D2F33',
          backgroundColor: '#2D2F33',
          pointStyle: 'circle',
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    };
    this.chart = new Chart('SubscriptionChart', {
      type: 'line',
      data: data,
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
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
