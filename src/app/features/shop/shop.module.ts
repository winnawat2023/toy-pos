import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';


@NgModule({
  declarations: [ ShopListComponent,ShopAddComponent, ShopDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ],
  //exports: [ShopListComponent  ],
})
export class ShopModule { }
