import {Component, OnInit} from '@angular/core';
import {Pigsty} from '../../model/pigsty';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PigstyService} from '../../service/pigsty.service';
import {VaccinationService} from '../../service/vaccination.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.component.html',
  styleUrls: ['./vaccination-create.component.css']
})
export class VaccinationCreateComponent implements OnInit {
  constructor(private pigstyService: PigstyService,
              private vaccinationService: VaccinationService,
              private router: Router,
              private datePipe: DatePipe,
              private toastrService: ToastrService,
              private title: Title) {
    this.title.setTitle(' Thêm lịch tiêm phòng ');
  }

  pigstyType = '---Chọn loại chuồng---';
  vaccineType = '---Chọn loại vaccine---';
  pigstys: Pigsty[] = [];
  PRRS: string;
  Mycoplasma: string;
  CSF: string;
  FMD: string;
  APP: string;
  date2: any;
  createPigsty: any;
  vaccinationForm: FormGroup = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern('^([1-9]{1}|1[0-9]{1}||20)$')]),
    vaccineType: new FormControl('', [Validators.required]),
    vaccinatedPerson: new FormControl('', [Validators.required,
      Validators.pattern('^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$')]),
    note: new FormControl('', Validators.maxLength(255)),
    pigstyCode: new FormControl('', [Validators.required]),
  });
  type = '';
  d3: any;

  ngOnInit(): void {
    this.getAllPigsty();
    console.log(this.vaccinationForm);
  }

  submit() {
    const vaccination = this.vaccinationForm.value;
    this.pigstyService.getPigsty(vaccination.pigstyCode).subscribe(pigstys => {
      vaccination.pigstyCode = {
        id: pigstys.id,
        code: pigstys.code
      };
      this.vaccinationService.saveVaccination(vaccination).subscribe(() => {
        this.vaccinationForm.reset();
        this.router.navigateByUrl('/vaccination');
        this.toastrService.success('Thêm mới thành công', ' Thông báo!!');
      }, e => console.log(e));
    });
  }

  getData(type) {
    this.type = type;
    this.pigstyService.getPigsty((type)).subscribe(item => {
        this.createPigsty = this.datePipe.transform(new Date(item.creationDate), 'dd/MM/yyyy');
      }
    );
  }

  getAllPigsty() {
    this.vaccinationService.getAll().subscribe(pigsty => {
      this.pigstys = pigsty;
    });
  }

  checkDate() {
    // @ts-ignore
    let day1: string[];
    day1 = this.createPigsty?.split('/');
    const newDay = day1[1] + '-' + day1[0] + '-' + day1[2];
    // console.log(newDay);
    const day = new Date(newDay);
    // console.log(this.createPigsty);
    // console.log(day);
    // const day = new Date(this.createPigsty);
    const vaccineType = this.vaccinationForm.controls.vaccineType.value;
    if (vaccineType === 'PRRS') {
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 10)), 'dd/MM/yyyy');
      this.date2 = d2;
      return new Date(this.date2);
    } else if (vaccineType === 'Mycoplasma') {
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 15)), 'dd/MM/yyyy');
      this.date2 = d2;
    } else if (vaccineType === 'CSF') {
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 35)), 'dd/MM/yyyy');
      this.date2 = d2;
    } else if (vaccineType === 'FMD') {
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 49)), 'dd/MM/yyyy');
      this.date2 = d2;
    } else {
      const d2 = this.datePipe.transform(new Date(day.setDate(day.getDate() + 77)), 'dd/MM/yyyy');
      this.date2 = d2;
    }
  }
}
