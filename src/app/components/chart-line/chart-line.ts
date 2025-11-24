import { Component } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart-line',
  imports: [NgApexchartsModule],
  templateUrl: './chart-line.html',
  styleUrl: './chart-line.scss',
})
export class ChartLine {
 public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Ventas",
          data: [10, 41, 35, 51, 49, 62, 69]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"]
      },
      title: {
        text: "Ventas por Mes"
      }
    };
  }
}
