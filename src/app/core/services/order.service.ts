import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { OrderHistory } from 'src/app/model/order';
import { ReceiptHistory } from 'src/app/model/receipt';


@Injectable({
  providedIn: 'root'
})


export class OrderService {

private dbPath = '/orders';

currentOrderHistory:OrderHistory;

orderRef: AngularFireList<OrderHistory>;

constructor(private db: AngularFireDatabase) {
  this.orderRef = db.list(this.dbPath);
}

setCurrentReceipt(orderHistory:OrderHistory){
  this.currentOrderHistory=orderHistory;
}

setCurrentOrderHistory(orderHistory:OrderHistory){
  this.currentOrderHistory=orderHistory;
}

getCurrentOrderHistory(){
  return this.currentOrderHistory;
}

getAll(date): AngularFireList<OrderHistory> {
  this.orderRef = this.db.list(this.dbPath, ref => ref.orderByChild('createTime').startAt(date+' 00:00:01').endAt(date+' 23:59:59'))
  return this.orderRef;


}

create(orderHistory: OrderHistory): any {
  return this.orderRef.push(orderHistory);
}

update(orderHistory:OrderHistory): Promise<void> {
  return this.orderRef.update(orderHistory.key, orderHistory);
}

delete(orderHistory: OrderHistory): Promise<void> {
  return this.orderRef.remove(orderHistory.key);
}


}
