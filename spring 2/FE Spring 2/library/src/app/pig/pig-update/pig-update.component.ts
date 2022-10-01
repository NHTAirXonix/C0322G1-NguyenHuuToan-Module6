import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {PigstyService} from '../../service/pigsty.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Pig} from '../../model/pig';
import {PigService} from '../../service/pig.service';

@Component({
  selector: 'app-pig-update',
  templateUrl: './pig-update.component.html',
  styleUrls: ['./pig-update.component.css']
})
export class PigUpdateComponent implements OnInit {
  pigsty: Pigsty[];
  pig: Pig;
  id: number;
  isExitsCode = false;
  formPig = new FormGroup({
    id: new FormControl(),
    code: new FormControl('', [Validators.required,
      Validators.pattern('^(L-)[0-9]{3}$')]),
    dateIn: new FormControl('', Validators.required),
    dateOut: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    weight: new FormControl('', [Validators.required, Validators.min(1),
      Validators.max(200)]),
    isDeleted: new FormControl(''),
    pigsty: new FormControl('', Validators.required),
  }, this.checkDateEnd);

  constructor(private pigService: PigService,
              private pigstyService: PigstyService,
              private toast: ToastrService,
              private router: Router,
              private activeRouter: ActivatedRoute) {
  }

  getAllPigsty() {
    this.pigstyService.getAllPigsty().subscribe(value => {
      this.pigsty = value;
    });
  }

  ngOnInit(): void {
    this.getAllPigsty();
    this.activeRouter.paramMap.subscribe(param => {
      this.findById(param.get('id'));
      this.id = +param.get('id');
    });
  }

  findById(id) {
    this.pigService.findById(id).subscribe(value => {
      this.formPig.setValue(value);
    }, error => {
      this.router.navigateByUrl('/500');
    });
  }

  cancel() {
    this.toast.error('Sửa thất bại');
    this.router.navigateByUrl('/pig').then(r => console.log(r));
  }

  submit() {
    this.pigService.updatePig(this.formPig.value).subscribe(value => {
        this.toast.success('Sửa thành công');
        this.router.navigateByUrl('/pig').then(r => console.log(r));
      },
      error => {
        this.toast.error('Sửa thất bại');
        console.log(error);
      });
  }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }
  checkDateEnd(abstractControl: AbstractControl): any {
    const start = new Date(abstractControl.value.dateIn);
    const now = new Date(abstractControl.value.dateOut);
    if (now > start) {
      return null;
    } else if (now < start) {
      return {checkDate: true};
    }
    if (now > start) {
      return null;
    } else if (now < start) {
      return {checkDate: true};
    } else {
      return null;
    }
  }
  reset(id: number) {
    console.log(id);
    this.pigService.findById(id).subscribe(next => {
      this.formPig.setValue(next);
    });
  }
  checkCode($event: EventTarget) {
    this.pigService.checkCode(String($event)).subscribe(
      value => {
        if (value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
  }
}
