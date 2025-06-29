import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddComponent } from './stock-add/stock-add.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: StockListComponent },
      { path: 'add', component: StockAddComponent },
      { path: 'list', component: StockListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
