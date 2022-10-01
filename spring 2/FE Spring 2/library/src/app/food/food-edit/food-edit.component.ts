import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PigstyService} from '../../service/pigsty.service';
import {StorageService} from '../../service/storage.service';
import {Pig} from '../../model/pig';
import {Storage} from '../../model/storage';
import {FoodService} from '../../service/food.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit {
  foodForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    unit: new FormControl(''),
    storage: new FormControl(''),
    pigsty: new FormControl(''),
  });
  pigsties: Pig[] = [];
  id: number;
  storages: Storage[] = [];

  constructor(private pigstyService: PigstyService,
              private storageService: StorageService,
              private foodService: FoodService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getFood(this.id);
    });
  }

  ngOnInit(): void {
    this.getStorages();
    this.getPigsties();
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

  getFood(id: number) {
    return this.foodService.findById(id).subscribe(food => {
      this.foodForm = new FormGroup({
        amount: new FormControl(food.amount, [Validators.required, Validators.min(1)]),
        unit: new FormControl(food.unit, [Validators.required]),
        storage: new FormControl(food.storage.id, [Validators.required]),
        pigsty: new FormControl(food.pigsty.id, [Validators.required]),
      });
      console.log(this.foodForm);
    });

  }

  editFood(id: number) {
    const food = this.foodForm.value;
    food.storage = {
      id: +food.storage
    };
    food.pigsty = {
      id: +food.pigsty
    };
    this.foodService.editFood(id, food).subscribe(() => {
    }, error => {
      this.toast.error('Chỉ nhập số và không dc nhập quá số lượng trong kho', 'Thông báo');
    }, () => {
      this.foodForm.reset();
      this.router.navigate(['/food']);
      this.toast.success('Cập nhập thức ăn thành công', 'Thông báo');
    });
  }
}
