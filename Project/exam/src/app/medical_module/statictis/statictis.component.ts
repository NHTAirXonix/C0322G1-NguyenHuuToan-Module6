import {Component, OnInit} from '@angular/core';
import {InputStatistic} from '../model/statisticInput';
import {DatePipe} from '@angular/common';
import {StatisticService} from '../service/statistic.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {isDate} from 'rxjs/internal-compatibility';
import {Title} from '@angular/platform-browser';
import {Toast, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statictis',
  templateUrl: './statictis.component.html',
  styleUrls: ['./statictis.component.css']
})

export class StatictisComponent implements OnInit {

  listStatisticByYear: any;
  listStatisticByMonth: any;
  statisticInput: InputStatistic;

  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 900), 'yyyy-MM-dd');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  private myChart: Chart;
  statisticForm: FormGroup;
  // errorChart = true;
  // errorServer = true;
  // errorList = true;
  // dateHidden = false;
  // statisticDateHidden = false;
  // resetHidden = true;
  time: string[] = ['1 week', '2 week', '1 month', '2 month', '1 quarter', '2 quarter', '1 year'];

  constructor(private datePipe: DatePipe,
              private statisticService: StatisticService,
              private title: Title,
              private toast: ToastrService
  ) {this.title.setTitle('Thống Kê'); }

  ngOnInit(): void {
    this.statisticForm = new FormGroup({
      startDate: new FormControl(this.pastDay, this.dateNotExist),
      endDate: new FormControl(this.today, this.dateInFuture),
      type: new FormControl('all', Validators.required),
      styleTime: new FormControl('month', Validators.required )
    }, this.invalidDate);
  }

  invalidDate(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v.startDate);
    const end = new Date(v.endDate);
    end.setDate(end.getDate() - 1);
    if (start > end) {
      return {dateNotValid: true};
    }
    if (start > new Date()) {
      return {futureDate: true};
    } else {
      return null;
    }
  }

  dateNotExist(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const start = new Date(v);
    if (!isDate(start)) {
      return {dateNotExist: true};
    }
  }

  dateInFuture(abstractControl: AbstractControl) {
    const v = abstractControl.value;
    const end = new Date(v);
    if (end > new Date()) {
      return {futureDate: true};
    }
    if (!isDate(end)) {
      return {dateNotExist: true};
    } else {
      return null;
    }
  }


  onSubmit() {

    if (this.statisticForm.value.styleTime === 'month') {
      this.statisticService.getStatisticByMonth(
        this.statisticForm.value.startDate,
        this.statisticForm.value.endDate,
        this.statisticForm.value.type).subscribe((value) => {
        this.listStatisticByMonth = value;
        // this.errorChart = false;
        // this.errorServer = true;
        // this.errorList = true;
        this.toast.success('Get Value success !');
        console.log(this.listStatisticByMonth);
        this.destroyChart();
        this.createChartMonth();
      });
    }
    if (this.statisticForm.value.styleTime === 'year') {
      this.statisticService.getStatisticByYear(
        this.statisticForm.value.startDate,
        this.statisticForm.value.endDate,
        this.statisticForm.value.type).subscribe((value) => {
        this.listStatisticByMonth = value;
        // this.errorChart = false;
        // this.errorServer = true;
        // this.errorList = true;
        this.toast.success('Get Value success !');
        console.log(this.listStatisticByMonth);
        this.destroyChart();
        this.createChartYear();
      });
    }
  }

  createChartMonth() {

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Số lượng heo',
          data: this.listStatisticByMonth,
          parsing: {
            xAxisKey: 'time',
            yAxisKey: 'amount'
          },
          backgroundColor: [
            '#0099FF'
          ],
          borderWidth: 1
        },
          {
            label: 'Doanh thu',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'time',
              yAxisKey: 'price'
            },
            backgroundColor: [
              '#3EB595'
            ],
            yAxisID: 'y1',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Số Lượng Heo ( Con )',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 10}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Thời Gian ( Tháng )',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Doanh Thu (VND)',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 5, bottom: 10}
            },
            min: 0,
            // max: this.listStatisticByMonth.max
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ SỐ LƯỢNG HEO VÀ DOANH THU CỦA CÔNG TY THEO THÁNG',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }

  createChartYear() {

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Số lượng heo',
          data: this.listStatisticByMonth,
          parsing: {
            xAxisKey: 'time',
            yAxisKey: 'amount'
          },
          backgroundColor: [
            '#0099FF'
          ],
          borderWidth: 1
        },
          {
            label: 'Doanh thu',
            data: this.listStatisticByMonth,
            parsing: {
              xAxisKey: 'time',
              yAxisKey: 'price'
            },
            backgroundColor: [
              '#3EB595'
            ],
            yAxisID: 'y1',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Số Lượng Heo ( Con )',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 10}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Thời Gian ( Năm )',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Doanh Thu (VND)',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 5, bottom: 10}
            },
            min: 0,
            // max: this.listStatisticByMonth.max
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ SỐ LƯỢNG HEO VÀ DOANH THU CỦA CÔNG TY THEO NĂM',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }

  destroyChart() {
    if (this.myChart != null) {
      this.myChart.destroy();
    }
  }
}

