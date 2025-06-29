import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Expenses } from 'src/app/model/expenses';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {

  expensesForm: FormGroup;
  expenseType;
  
  constructor(
    private accountService: AccountsService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.expenseType = this.accountService.expenseType;

    this.expensesForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      type:[this.expenseType[0].expenseTypeID,Validators.required],
      description: [null],
    });

  }

  addExpense(): void {
    let expense:Expenses = this.expensesForm.value;
    expense.createBy=this.authService.getCurrentUser();
    let now = this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    expense.createTime= now;
    expense.updateBy=this.authService.getCurrentUser();
    expense.updateTime=now;
    console.log('create expense ',expense);
    this.accountService.createExpense(expense).then(() => {
      console.log('create shop successfully! ',expense);
      this.getBack();
    });
  }

  getBack(){
    this.router.navigate(['/accounts/expense']);
  }

}
