import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { DailyAccount, DailyAccountOutcome } from 'src/app/model/accounts';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-accounts-daily',
  templateUrl: './accounts-daily.component.html',
  styleUrls: ['./accounts-daily.component.css']
})
export class AccountsDailyComponent implements OnInit {

  paymentTypes;
  outcomeTypes;
  expenses;
  shops?: Shop[];
  currentDailyAccounts: DailyAccount;
  

  constructor(
    private accountService: AccountsService,
    private dialog: MatDialog,
    private shopService: ShopService,
    private fb: FormBuilder,
    private datepipe: DatePipe) { }


  fillterForm: FormGroup;
  dailyAccountsForm: FormGroup;
  dailyAccountsFormOutcome: FormGroup;
  shortOver = 0;
  ngOnInit(): void { 
    this.paymentTypes = this.accountService.paymentTypes;
    this.outcomeTypes = this.accountService.outcomeTypes;
    this.fillterForm = this.fb.group({
      date: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]
    });
   
    this.createForm();
    this.retrieveExpenses();
    this.retrieveShops();
    this.outcomeTypeChange();
    this.retrieveAccountDaily();
  }


  createForm() {
    this.shortOver = 0;
    this.dailyAccountsForm = this.fb.group({
      key: [],
      date: [this.fillterForm.get('date').value],

      sale_total: [0, Validators.required],
      sale_transfer: [0, Validators.required],
      sale_cash: [0, Validators.required],

      income_transfer: [0],
      income_cash: [0],
      income_total: [0],

      outcomes: [[], Validators.required],
      total_outcome: [0],
      total_outcome_cash: [0],
      total_outcome_transfer: [0],
      total_outcome_bag: [0],
      total_outcome_credit: [0],
      total_outcome_food:[0],
      wallet: [0],
      countable_cash: [0]
      

    });

    this.dailyAccountsFormOutcome = this.fb.group({
      outcome_type: ['shop', Validators.required],
      outcome_total: [null, Validators.required],
      payment_type: this.paymentTypes[0],
      detail: '',
      shop: [],
      expense: []
    });
  }

  refreshList(): void {
    this.retrieveExpenses();
  }

  dateChange() {
    this.retrieveAccountDaily();
  }

  retrieveAccountDaily(): void {
    this.createForm();
    this.currentDailyAccounts = null;
    console.log('retrieveAccountDaily', this.fillterForm.get('date').value);
    this.accountService.getAccountDaily(this.fillterForm.get('date').value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('dailyAccount', data);
      if (data.length > 0) {
        this.currentDailyAccounts = data[0];
        this.dailyAccountsForm.get('key').setValue(this.currentDailyAccounts.key);
        this.dailyAccountsForm.get('date').setValue(this.currentDailyAccounts.date);

        this.dailyAccountsForm.get('income_transfer').setValue(this.currentDailyAccounts.income_transfer);
        this.dailyAccountsForm.get('income_cash').setValue(this.currentDailyAccounts.income_cash);
        this.dailyAccountsForm.get('income_total').setValue(this.currentDailyAccounts.income_total);
        this.dailyAccountsForm.get('countable_cash').setValue(this.currentDailyAccounts.countable_cash);
        this.dailyAccountsForm.get('wallet').setValue(this.currentDailyAccounts.wallet);

        this.dailyAccountsForm.get('sale_total').setValue(this.currentDailyAccounts.sale_total);
        this.dailyAccountsForm.get('sale_transfer').setValue(this.currentDailyAccounts.sale_transfer);
        this.dailyAccountsForm.get('sale_cash').setValue(this.currentDailyAccounts.sale_cash);

        this.dailyAccountsForm.get('outcomes').setValue(this.currentDailyAccounts.outcomes);
        this.dailyAccountsForm.get('total_outcome').setValue(this.currentDailyAccounts.total_outcome);
        
        this.calSummary();
      }
    });
  }

  retrieveExpenses(): void {
    this.accountService.getAllExpenses().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('expenses', data);
      this.expenses = data;
    });
  }

  retrieveShops(): void {
    this.shopService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.shops = data;
      if (this.shops) {
        console.log(this.shops);
        this.dailyAccountsFormOutcome.get("shop").setValue(this.shops[1]);

      }
    });
  }

  onSave() {
    console.log('onSave');
    if (this.currentDailyAccounts) {
      console.log('update');
      let dailyAccounts: DailyAccount = this.dailyAccountsForm.value;
      console.log('update ', dailyAccounts);
      this.accountService.updateAccountDaily(dailyAccounts).then(() => {
        console.log('update shop successfully! ', dailyAccounts);
      });
    } else {
      console.log('create');
      let dailyAccounts: DailyAccount = this.dailyAccountsForm.value;
      this.accountService.saveAccountDaily(dailyAccounts).then(() => {
        console.log('create shop successfully! ', dailyAccounts);
      });
    }
  }

  outcomeTypeChange() {
     console.log('outcomeTypeChange : ' + this.dailyAccountsFormOutcome.get('outcome_type').value);
    if (this.dailyAccountsFormOutcome.get('outcome_type').value == 'expenses') {
      this.dailyAccountsFormOutcome.get('expense').setValue(this.expenses[1]);
      this.dailyAccountsFormOutcome.get('payment_type').setValue(this.paymentTypes[0]);
      this.dailyAccountsFormOutcome.get('shop').setValue(null);
    } else if (this.dailyAccountsFormOutcome.get('outcome_type').value == 'shop') {
     this.dailyAccountsFormOutcome.get('payment_type').setValue(this.paymentTypes[1]);
     this.dailyAccountsFormOutcome.get('expense').setValue(null);
    }
    
  }

  addOutcome() {
    let outcomes = this.dailyAccountsForm.get('outcomes').value;
    let outcome:DailyAccountOutcome = this.dailyAccountsFormOutcome.value;
    if (!outcomes) {
      outcomes = [];
    }
    outcomes.push(outcome);
    this.dailyAccountsForm.get('outcomes').setValue(outcomes);
    this.dailyAccountsFormOutcome.get('outcome_total').setValue(null);
    this.calSummary()
  }

  deleteOutcome(outcome) {
    let outcomes = this.dailyAccountsForm.get('outcomes').value;
    const index: number = outcomes.indexOf(outcome);
    if (index !== -1) {
      outcomes.splice(index, 1);
    }
    this.dailyAccountsForm.get('outcomes').setValue(outcomes);
    this.calSummary();
  }

  getExpenseType(outcome) {
    if (outcome.outcome_type == 'shop') {
      return 'ค่าอาหาร';
    } else if (outcome.outcome_type == 'expenses') {
      return 'ค่าใช้จ่ายที่บันทึกไว้'
    } else if (outcome.outcome_type == 'other') {
      return 'ค่าใช้จ่ายอื่นๆ'
    }
    return '';
  }

  getExpenseDetail(outcome) {
   // console.log('getExpenseDetail ',outcome);
    if (outcome.outcome_type == 'shop' && outcome.shop) {
      return outcome.shop.title;
    } else if (outcome.outcome_type == 'expenses' && outcome.expense) {
      return outcome.expense.name
    } else if (outcome.outcome_type == 'other') {
      return outcome.detail
    }
    return '';
  }

  calSummary() {
    let total_outcome = 0;
    let total_outcome_cash = 0;
    let total_outcome_transfer = 0;
    let total_outcome_bag = 0;
    let total_outcome_credit = 0;
    let total_outcome_food = 0;

    let outcomes = this.dailyAccountsForm.get('outcomes').value;
    if (outcomes) {
      for (let o of outcomes) {
        total_outcome = total_outcome + o.outcome_total;
        if (o.payment_type.payment_id == '0') {
          total_outcome_cash = total_outcome_cash + o.outcome_total;
        } else if (o.payment_type.payment_id == '1') {
          total_outcome_transfer = total_outcome_transfer + o.outcome_total;
          if(o.outcome_type=='shop'){
            total_outcome_food = total_outcome_food + o.outcome_total
          }
        } else if (o.payment_type.payment_id == '2') {
          total_outcome_bag = total_outcome_bag + o.outcome_total;
        } else if (o.payment_type.payment_id == '3') {
          total_outcome_credit = total_outcome_credit + o.outcome_total;
        }
      }
    }
   
    this.dailyAccountsForm.get('total_outcome_food').setValue(total_outcome_food);
    this.dailyAccountsForm.get('total_outcome').setValue(total_outcome);
    this.dailyAccountsForm.get('total_outcome_cash').setValue(total_outcome_cash);
    this.dailyAccountsForm.get('total_outcome_transfer').setValue(total_outcome_transfer);
    this.dailyAccountsForm.get('total_outcome_bag').setValue(total_outcome_bag);
    this.dailyAccountsForm.get('total_outcome_credit').setValue(total_outcome_credit);

    if(this.dailyAccountsForm.get('countable_cash').value>0){
      this.dailyAccountsForm.get('wallet').setValue(this.dailyAccountsForm.get('countable_cash').value -4000);
      this.dailyAccountsForm.get('income_cash').setValue(this.dailyAccountsForm.get('countable_cash').value - 4000 +total_outcome_cash);
    }
    this.dailyAccountsForm.get('income_total').setValue(this.dailyAccountsForm.get('income_transfer').value + this.dailyAccountsForm.get('income_cash').value);

    this.dailyAccountsForm.get('sale_cash').setValue(this.dailyAccountsForm.get('income_cash').value);
    this.dailyAccountsForm.get('sale_transfer').setValue(this.dailyAccountsForm.get('sale_total').value - this.dailyAccountsForm.get('sale_cash').value);
    this.getShortOver();
  }

  getShortOver(){
    let income_cash = this.dailyAccountsForm.get('income_cash').value;
    let income_transfer = this.dailyAccountsForm.get('income_transfer').value - this.dailyAccountsForm.get('total_outcome_food').value;
    let sale_total  = this.dailyAccountsForm.get('sale_total').value;
    this.shortOver = income_cash+income_transfer - sale_total;
    
 
  }



}
