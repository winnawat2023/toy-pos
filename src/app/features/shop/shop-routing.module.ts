import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ShopAddComponent } from './shop-add/shop-add.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ShopListComponent },
      { path: 'add', component: ShopAddComponent },
      { path: 'list', component: ShopListComponent },
      { path: 'detail', component: ShopDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
