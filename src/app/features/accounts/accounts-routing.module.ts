import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { AccountsDailyComponent } from './accounts-daily/accounts-daily.component';
import { IncomeStatementComponent } from './income-statement/income-statement.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: AccountsDailyComponent },
      { path: 'income-statement', component: IncomeStatementComponent },
      { path: 'accounts-daily', component: AccountsDailyComponent },
      { path: 'expense', component: ExpenseListComponent },
      { path: 'expenses-add', component: ExpenseAddComponent },
      { path: 'expenses-edit', component: ExpenseEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
