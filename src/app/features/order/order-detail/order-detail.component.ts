import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  currentOrderHistory: any;
  customer: Customer;
  orders: Order[]

  constructor(
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    if (this.orderService.getCurrentOrderHistory()) {
      this.currentOrderHistory = this.orderService.getCurrentOrderHistory();
      console.log("currentOrderHistory", this.currentOrderHistory);
      this.orders = this.currentOrderHistory.orders;
      this.customer = this.currentOrderHistory.customer.customer;
    } else {
      this.goToDashboard();
    }

  }

  goToDashboard() {
    this.router.navigate(['/order/']);
  }

}
