import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseRoutingModule } from './expense-routing.module';


@NgModule({
  declarations: [ ExpenseAddComponent,ExpenseDetailComponent,ExpenseListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
