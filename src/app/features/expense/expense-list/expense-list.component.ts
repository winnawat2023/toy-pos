import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Expense } from 'src/app/model/expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenseForm: FormGroup;
  fillterForm: FormGroup;
  expenses: Expense[];
  total:number=0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private walletService: WalletService, 
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      amount: [null, Validators.required],
      payDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required]
    });

    this.fillterForm = this.fb.group({
      startDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      endDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required]
    });


    
    this.refreshExpenseList();
  }

  refreshExpenseList(): void {
    this.retrieveExpense();
  }

  retrieveExpense(): void {
    let startDate = this.fillterForm.get("startDate").value;
    let endDate = this.fillterForm.get("endDate").value;
    this.expenseService.getAll(startDate,endDate).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.expenses = data;
      console.log(this.expenses);
      this.total = 0;
      if(this.expenses){
        for(let e of this.expenses){
            this.total = e.amount+this.total;
        }
      }
    });
  }

  save() {
    let expense: Expense = new Expense();
    expense.amount=this.expenseForm.get("amount").value;
    expense.createBy=this.authService.getCurrentUser();
    expense.createTime=  this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    expense.name=this.expenseForm.get("name").value;
    expense.payDate=this.expenseForm.get("payDate").value;
    expense.updateBy=this.authService.getCurrentUser();
    expense.updateTime=expense.createTime;
    this.expenseService.create(expense);
    this.refreshExpenseList();
  }

  dateChange(){
    this.refreshExpenseList();
  }

}
