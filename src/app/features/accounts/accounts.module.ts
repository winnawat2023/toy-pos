import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsDailyComponent } from './accounts-daily/accounts-daily.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { IncomeStatementComponent } from './income-statement/income-statement.component';

import {MatRadioModule} from '@angular/material/radio';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';


@NgModule({
  declarations: [AccountsDailyComponent, IncomeStatementComponent, ExpenseListComponent, ExpenseAddComponent, ExpenseEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule,
    MatRadioModule
  ]
})

export class AccountsModule { }


