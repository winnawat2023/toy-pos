import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DailyAccount } from 'src/app/model/accounts';
import { Expenses } from 'src/app/model/expenses';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  currentExpense:Expenses;

  expenseType = [
    {expenseTypeID:'501',expenseTypeName:'ค่าใช้จ่ายในการขาย'},
    {expenseTypeID:'502',expenseTypeName:'ค่าใช้จ่ายดำเนินงาน'},
    {expenseTypeID:'503',expenseTypeName:'ค่าใช้จ่ายทางภาษี'}
  ];

  outcomeTypes = [
    { outcome_id: "0", outcome_name: "ค่าอาหาร" }, 
    { outcome_id: "1", outcome_name: "ค่าใช้จ่ายที่บันทึกไว้" }, 
    { outcome_id: "2", outcome_name: "อื่นๆ" }, 
  ]

  paymentTypes = [
    { payment_id: "0", payment_name: "เงินสด" }, 
    { payment_id: "1", payment_name: "เงินโอน" }, 
    { payment_id: "2", payment_name: "เงินในกระเป๋า" },
    { payment_id: "3", payment_name: "บัตรเครดิต" }
  ]

  private dbAccountExpensePath = '/accounts/expenses';
  expensesRef: AngularFireList<Expenses>;

  private dbAccountDailyPath = '/accounts/daily';
  dailyRef: AngularFireList<DailyAccount>;


  constructor(private db: AngularFireDatabase) {
    this.expensesRef = db.list(this.dbAccountExpensePath);
    this.dailyRef = db.list(this.dbAccountDailyPath);
  }

  getAccountDaily(date): AngularFireList<DailyAccount> {
    this.dailyRef = this.db.list(this.dbAccountDailyPath, ref => ref.orderByChild('date').equalTo(date))
    return this.dailyRef;
  }

  getReportDailyAccount(startDate,endDate): AngularFireList<DailyAccount> {
    this.dailyRef = this.db.list(this.dbAccountDailyPath, ref =>  ref.orderByChild('date').startAt(startDate).endAt(endDate))
    return this.dailyRef;
  }

  saveAccountDaily(dailyAccount: DailyAccount): any {
    return this.dailyRef.push(dailyAccount);
  }

  updateAccountDaily(dailyAccount: DailyAccount): any {
    return this.dailyRef.update(dailyAccount.key,dailyAccount);
  }

  
  
  getAllExpenses(): AngularFireList<Expenses> {
    return this.expensesRef;
  }

  createExpense(expenses: Expenses): any {
    return this.expensesRef.push(expenses);
  }

  updateExpense(expenses: Expenses): Promise<void> {
    return this.expensesRef.update(expenses.key, expenses);
  }

  deleteExpense(key: string): Promise<void> {
    return this.expensesRef.remove(key);
  }

  getExpenseTypeName(key:String){
    for(let e of this.expenseType){
      if(key==e.expenseTypeID){
        return e.expenseTypeName
      }
    }
    return '';
  }
  
}
