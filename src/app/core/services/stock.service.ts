import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ReceiptHistory } from 'src/app/model/receipt';

@Injectable({
  providedIn: 'root'
})

export class StockService {

private dbPath = '/receipts';
currentReceipt:ReceiptHistory;

receiptRef: AngularFireList<ReceiptHistory>;

constructor(private db: AngularFireDatabase) {
  this.receiptRef = db.list(this.dbPath);
}

setCurrentReceipt(receipt:ReceiptHistory){
  this.currentReceipt=receipt;
}

getCurrentShop(){
  return this.currentReceipt;
}

getAll(): AngularFireList<ReceiptHistory> {
  return this.receiptRef;
}

create(receipt: ReceiptHistory): any {
  return this.receiptRef.push(receipt);
}

update(receipt:ReceiptHistory): Promise<void> {
  return this.receiptRef.update(receipt.key, receipt);
}

delete(receipt: ReceiptHistory): Promise<void> {
  return this.receiptRef.remove(receipt.key);
}

getReceiptStatus(status:boolean){
  if(status){
    return "ใช้งาน";
  }else{
    return "ตรวจสอบ";
  }
}


}
