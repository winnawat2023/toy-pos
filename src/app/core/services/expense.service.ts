import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Expense } from 'src/app/model/expense';
import { Wallet } from 'src/app/model/wallet';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private dbPath = '/expense';
  currentWallet:Wallet;

  expenseRef: AngularFireList<Expense>;

  constructor(
    private db: AngularFireDatabase,
    public datepipe: DatePipe) {

    this.expenseRef = db.list(this.dbPath);
    console.log("constructor walletRef",this.expenseRef);
  }

  getAll(start,end): AngularFireList<Expense> {
    this.expenseRef = this.db.list(this.dbPath, ref => ref.orderByChild('payDate').startAt(start).endAt(end))
    return this.expenseRef;
  }

  create(expense: Expense): any {
    return this.expenseRef.push(expense);
  }

  update(wallet: Wallet): Promise<void> {
    return this.expenseRef.update(wallet.key, wallet);
  }

}


