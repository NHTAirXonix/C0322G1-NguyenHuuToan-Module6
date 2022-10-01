import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../service/statistic.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";
import {Cart} from "../../model/cart";
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  username: any;
  total: number = 0;
  user: any;
  listCart: Cart[];
  constructor(private statisticService: StatisticService,
              private router: Router,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.loadHeader();
    this.statisticService.getUser(this.username).subscribe(data => {
      this.user = data;

    });
    this.statisticService.getCart(this.username).subscribe(data => {
      this.listCart = data;
      for (let i =0; i < this.listCart.length; i++) {
        this.total += this.listCart[i].book.bookPrice * this.listCart[i].amount;
      }
    });
    console.log(this.listCart)
    this.pay();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.username);
    }
  }

  pay() {
    if (this.total >= 0) {
      render(
        {
          id: '#payments',
          currency: 'USD',
          value: String((this.total / 23000).toFixed(2)),
          onApprove: (details) => {
            console.log(details);
            if (details.status == 'COMPLETED') {
              // this.onPaymentSuccess();
            } else {
              this.toast.error('Thanh toán thất bại')
              this.router.navigateByUrl('/cart')
            }
          }
        }
      );
    }
  }


}
