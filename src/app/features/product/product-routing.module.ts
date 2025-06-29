import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTypeAddComponent } from './product-type-add/product-type-add.component';
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProductTypeDetailComponent } from './product-type-detail/product-type-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: ProductAddComponent },
      { path: 'list', component: ProductListComponent },
      { path: 'detail', component: ProductDetailComponent },
      { path: 'type/add', component: ProductTypeAddComponent },
      { path: 'type/detail', component: ProductTypeDetailComponent },
      { path: 'type/list', component: ProductTypeListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
