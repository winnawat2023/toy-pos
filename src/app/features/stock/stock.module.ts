import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  StockRoutingModule } from './stock-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';import { StockAddComponent } from './stock-add/stock-add.component';
import { StockListComponent } from './stock-list/stock-list.component';



@NgModule({
  declarations: [ StockAddComponent,StockListComponent],
  imports: [
    CommonModule,
    SharedModule,
    StockRoutingModule
  ],
  //exports: [ShopListComponent  ],
})
export class StockModule { }
