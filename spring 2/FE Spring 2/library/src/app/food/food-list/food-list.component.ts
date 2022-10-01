import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FoodService} from '../../service/food.service';
import {ToastrService} from 'ngx-toastr';
import {Food} from '../../model/food';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodList: Food[] = [];
  formSearch: FormGroup;
  searchName = '';
  page = 0;
  number = 0;
  totalPages = 0;
  private sort = 'id';
  amountValue = 'amount,asc';
  unitValue = 'unit,asc';
  foodTypeValue = 'storage.food_type,asc';
  checkNext: boolean;
  checkPreview: boolean;
  code: string;
  private checkSpecialCharacterName: boolean;
  sizePage: number;
  element: number;
  size = '5';
  totalElements = 0;

  constructor(private foodService: FoodService, private toast: ToastrService, private title: Title) {
    this.title.setTitle(' Quản Lý Thức Ăn');
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllFood(this.page, this.searchName, this.sort, this.size);
  }

  getAllFood(pageable: number, searchName: string, sort: string, size: string) {
    if (this.formSearch.value.searchName === 'null'
      || this.formSearch.value.searchName === '#'
      || this.formSearch.value.searchName === '%'
      || this.formSearch.value.searchName === '^'
      || this.formSearch.value.searchName === '&'
    ) {
      this.foodList = [];
      return;
    }
    this.foodService.getAll(pageable, searchName, sort, size).subscribe((value: any) => {
      if (value != null) {
        this.foodList = value.content;
        this.number = value.number;
        this.totalPages = value.totalPages;
        this.checkNext = !value.last;
        this.checkPreview = !value.first;
        this.sizePage = value.size;
        this.element = value.element;
        this.totalElements = value.totalElements;
      } else {
        this.foodList = [];
      }
    });
  }
  createForm() {
    this.formSearch = new FormGroup({
      typeSearch: new FormControl()
    });
  }

  searchByType() {
    this.formSearch.value.searchName = this.formSearch.value.typeSearch.trim();
    if (this.formSearch.value.searchName === 'null'
      || this.formSearch.value.searchName === '#'
      || this.formSearch.value.searchName === '%'
      || this.formSearch.value.searchName === '^'
      || this.formSearch.value.searchName === '&') {
    } else {
      if (this.formSearch.value.searchName.search()) {
        this.checkSpecialCharacterName = true;
        this.searchName = this.formSearch.value.typeSearch;
      } else {
        this.checkSpecialCharacterName = false;
        this.searchName = this.formSearch.value.typeSearch;
      }
    }
    this.getAllFood(0, this.searchName, this.sort, this.size);
  }

  goPrevious() {
    if (this.page > 0) {
      this.page--;
    }
    this.getAllFood(this.page, this.searchName, this.sort, this.size);
  }

  goNext() {
    if (this.page < this.totalPages - 1) {
      this.page++;
    }
    this.getAllFood(this.page, this.searchName, this.sort, this.size);

  }

  sortAmount(amount: string) {
    if (amount === 'amount,asc') {
      this.sort = 'amount,asc';
      this.amountValue = 'amount,desc';
    } else {
      this.sort = 'amount,desc';
      this.amountValue = 'amount,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort, this.size);
  }

  sortUnit(unit: string) {
    if (unit === 'unit,asc') {
      this.sort = 'unit,asc';
      this.unitValue = 'unit,desc';
    } else {
      this.sort = 'unit,desc';
      this.unitValue = 'unit,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort, this.size);
  }

  sortFoodType(foodTypeValue: string) {
    if (foodTypeValue === 'storage.food_type,asc') {
      this.sort = 'storage.food_type,asc';
      this.foodTypeValue = 'storage.food_type,desc';
    } else {
      this.sort = 'storage.food_type,desc';
      this.foodTypeValue = 'storage.food_type,asc';
    }
    this.getAllFood(this.page, this.searchName, this.sort, this.size);
  }

  sizeTotal(size: string) {
    this.size = size;
    console.log(this.totalElements);
    if (this.totalElements > Number(size)) {
      this.getAllFood(this.page, this.searchName, this.sort, size);
    } else {
      this.getAllFood(0, this.searchName, this.sort, size);
    }
  }
}
