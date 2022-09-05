import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import {MedicalRecordService} from '../service/medicalRecord.service';
import {Patient} from '../model/patient';


@Component({
  selector: 'app-statictis',
  templateUrl: './statictis.component.html',
  styleUrls: ['./statictis.component.css']
})

export class StatictisComponent implements OnInit {

  data: string[];
  monthN: string[] = [];
  valueN: string[] = [];

  public canvas: any;
  public ctx: any;
  public labels: any = this.monthN;
  public dataCases: any = {
    chart1: this.valueN,
  };

  constructor(private medicalRecordService: MedicalRecordService) { }

  ngOnInit(): void {
    this.createLineChart(this.labels, this.dataCases, 'myChart');
    this.medicalRecordService.getChart().subscribe((next: string[]) => {
      this.data = next;
      console.log(this.data);
      // tslint:disable-next-line:prefer-for-of
      for (let z = 0; z < this.data.length; z++) {
        this.monthN.push(this.data[z][0]);
        this.valueN.push(this.data[z][1]);
      }
    });
  }

  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    const chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Amount',
          data: dataCases.chart1,
          backgroundColor: '#facf8c',
          borderColor: '#ffac00',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: 'First chart'
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
      }
    });
  }
}

