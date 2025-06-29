import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { OrderHistory } from 'src/app/model/order';
import { Wallet } from 'src/app/model/wallet';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  fillterForm: FormGroup;

  orderHistorys?: OrderHistory[];
  currentWallet?:Wallet = new Wallet();
  historyWallet?:Wallet = new Wallet();

  constructor(
    private router: Router,
    private orderService: OrderService,
    public walletService:WalletService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fillterForm = this.fb.group({
      date: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]
    });
    this.retrieveOrderHistory();
   this.retrieveWallet();
  }

  retrieveWallet(): void {
    this.walletService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.currentWallet=data[0];
      console.log('currentWallet', this.currentWallet);
    });
  }

  retrieveOrderHistory(): void {
    let date = this.fillterForm.get("date").value;
    console.log(date);
    this.orderService.getAll(date).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('orderHistorys', data);
      this.orderHistorys = data;
      this.setHistoryWallet();
    });
  }

  setHistoryWallet(){
    this.historyWallet = new Wallet();
    this.historyWallet.balance=0;
    this.historyWallet.transfer=0;
    this.historyWallet.cash=0;

    for(let order of this.orderHistorys){
      console.log(this.historyWallet);
      this.historyWallet.balance= this.historyWallet.balance+order.total;
      if(order.payment.type=='cash'){
        this.historyWallet.cash= this.historyWallet.cash+order.total;
      }else{
        this.historyWallet.transfer= this.historyWallet.transfer+order.total;
      }
    }
  }

  getPaymentType(type) {
    if (type == 'cash') {
      return "เงินสด";
    } else {
      return "โอนเงิน";
    }
  }

  dateChange(){
    console.log(this.fillterForm.value);
    this.retrieveOrderHistory();
  }

  setActiveOrder(order:OrderHistory){
    this.orderService.setCurrentOrderHistory(order);
    this.router.navigate(['/order/detail']);
  }

}
