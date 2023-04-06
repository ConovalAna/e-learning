import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-week-chart',
  templateUrl: './week-chart.component.html',
  styleUrls: ['./week-chart.component.scss']
})
export class WeekChartComponent implements OnInit {
  chartData: ChartDataset[] = [
    {
      label: 'my day activity %',
      data: [100, 95, 30, 20, 60, 80],

      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered

      pointRadius: 2,
      borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      pointBackgroundColor: '#2D2F33',
      pointHoverBackgroundColor: '#2D2F33',
      borderWidth: 2, // main line width
      hoverBorderWidth: 0, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0.3, // makes line more squiggly
    }
  ];
  chartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Frinday', 'Saturday'];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      xAxis: {
        display: false,
        grid: {
          display: false
        }
      },
      yAxis: {
        display: false
      }
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: false, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#2D2F33',
        titleFont: {
          size: 18
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
