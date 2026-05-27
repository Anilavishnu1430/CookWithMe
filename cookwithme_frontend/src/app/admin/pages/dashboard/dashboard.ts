import { AdminHeader } from "../../components/admin-header/admin-header";
import { Sidebar } from "../../components/sidebar/sidebar";
import {Component, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from "highcharts-angular";



@Component({
  selector: 'app-dashboard',
  providers: [provideNativeDateAdapter()],
  imports: [AdminHeader, Sidebar, MatCardModule, MatDatepickerModule,  HighchartsChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  selected = model<Date | null>(null);
  Highcharts:typeof Highcharts = Highcharts
  chartOptions = {}

  constructor() {
  this.chartOptions = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Recipe Details Overview'
    },
    subtitle: {
      text: 'Source: Recipe Management System'
    },
    yAxis: {
      title: {
        useHTML: true,
        text: 'Recipe Count'
      }
    },
    tooltip: {
      shared: true,
      headerFormat:
        '<span style="font-size:12px"><b>{point.key}</b></span><br>'
    },
    plotOptions: {
      series: {
        pointStart: 2020
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: [
      {
        name: 'Breakfast Recipes',
        data: [12, 18, 25, 30, 35, 40, 45]
      },
      {
        name: 'Lunch Recipes',
        data: [15, 20, 28, 34, 38, 42, 50]
      },
      {
        name: 'Dinner Recipes',
        data: [10, 16, 22, 29, 36, 41, 48]
      },
      {
        name: 'Desserts',
        data: [5, 8, 12, 18, 24, 30, 36]
      },
      {
        name: 'Drinks',
        data: [3, 6, 9, 12, 15, 18, 22]
      }
    ]
  };
}
}
