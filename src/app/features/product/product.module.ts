import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopModule } from '../shop/shop.module';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProductTypeDetailComponent } from './product-type-detail/product-type-detail.component';
;


@NgModule({
  declarations: [ 
    ProductListComponent, ProductAddComponent, ProductDetailComponent, ProductTypeAddComponent, ProductTypeListComponent, ProductTypeDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    ShopModule
  ]
})
export class ProductModule { }
