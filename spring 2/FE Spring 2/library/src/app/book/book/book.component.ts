import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StatisticService} from "../../service/statistic.service";
import {Cart} from "../../model/cart";
import {TokenStorageService} from "../../service/token-storage.service";
import {AppUser} from "../../model/app-user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: number;
  book: any;
  username: any;
  price: number;
  amount: number = 1;
  cart: Cart;
  user: any;
  totalPrice: number;
  constructor(private activatedRoute: ActivatedRoute,
              private statisticService: StatisticService,
              private router: Router,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
  ) { }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    this.statisticService.getBook(this.id).subscribe(value => {
      this.book = value;
      this.price = this.book.bookPrice;
      this.totalPrice = this.book.bookPrice;
    });
    this.loadHeader();
    this.statisticService.getUser(this.username).subscribe(data => {
      this.user = data;
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.username);
    }
  }

  increase() {
    this.amount++;
  }

  decrease() {
    if(this.amount<=1) {
      this.amount=1;
    } else {
      this.amount--;
    }
  }

  addAndGoToCart() {
    this.statisticService.addToCart(this.amount, this.book.id, this.user.username).subscribe(
      success => { });
    this.router.navigate(['/cart']);
  }

  addToCart() {
    this.statisticService.addToCart(this.amount, this.book.id, this.user.username).subscribe(
      success => {
        this.toast.success('Đã thêm vào giỏ hàng', 'Thông báo');
    },
     error =>  {
       this.toast.error('Không thể thêm vào giỏ hàng', 'Thông báo');
      }
    );
  }
}
