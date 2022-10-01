import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pigsty} from '../../model/pigsty';
import {StorageService} from '../../service/storage.service';
import {PigstyService} from '../../service/pigsty.service';
import {Storage} from '../../model/storage';
import {FoodService} from '../../service/food.service';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})
export class FoodCreateComponent implements OnInit {
  pigsties: Pigsty[] = [];
  storages: Storage[] = [];

  foodForm: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)]),
    unit: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required]),
    pigsty: new FormControl('', [Validators.required]),
  });

  constructor(private pigstyService: PigstyService,
              private storageService: StorageService,
              private foodService: FoodService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getPigsties();
    this.getStorages();
  }

  reset(): void {
    this.foodForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      storage: new FormControl('', [Validators.required]),
      pigsty: new FormControl('', [Validators.required]),
    });
  }

  getPigsties(): void {
    this.pigstyService.getAllList().subscribe((pigstyService?: any) => {
      this.pigsties = pigstyService;
    });
  }

  getStorages(): void {
    this.storageService.getAllS().subscribe((storageService?: any) => {
      this.storages = storageService;
    });
  }

  submit() {
    const food = this.foodForm.value;
    food.storage = {
      id: +food.storage
    };
    food.pigsty = {
      id: +food.pigsty
    };
    this.foodService.saveFood(food).subscribe(() => {
    }, error => {
      this.toast.error('Chỉ nhập số và không dc nhập quá số lượng trong kho', 'Thông báo');
    }, () => {
      this.foodForm.reset();
      this.router.navigate(['/food']);
      this.toast.success('Thêm mới thức ăn thành công', 'Thông báo');
    });
  }
}
