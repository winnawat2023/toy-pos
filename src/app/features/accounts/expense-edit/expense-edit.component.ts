import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Expenses } from 'src/app/model/expenses';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {

  expensesForm: FormGroup;
  expenseType;
  currentExpense;

  constructor(
    private accountService: AccountsService,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.expenseType = this.accountService.expenseType;
    this.currentExpense = this.accountService.currentExpense;
    console.log('currentExpense ',this.currentExpense);
    this.expensesForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      type: [null, Validators.required],
      description: [null],
    });

    if (this.accountService.currentExpense) {
      this.expensesForm.get('name').setValue(this.currentExpense.name);
      this.expensesForm.get('type').setValue(this.currentExpense.type);
      this.expensesForm.get('description').setValue(this.currentExpense.description);
    }else{
      this.getBack();
    }
  }

  updateExpense(): void {
    let expense:Expenses = this.expensesForm.value;
    let now = this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
    expense.updateBy=this.authService.getCurrentUser();
    expense.createBy=this.currentExpense.createBy;
    expense.createTime=this.currentExpense.createTime;
    expense.updateTime=now;
    expense.key=this.currentExpense.key;
    
    console.log('create expense ',expense);
    /*this.accountService.createExpense(expense).then(() => {
      console.log('create shop successfully! ',expense);
      this.getBack();
    });*/
  }

  getBack(){
    this.router.navigate(['/accounts/expense']);
  }

}


