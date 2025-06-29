import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentAddComponent } from './rent-add/rent-add.component';
import { RentDetailComponent } from './rent-detail/rent-detail.component';
import { LotsAddComponent } from '../lots/lots-add/lots-add.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: RentListComponent },
      { path: 'add', component: RentAddComponent },
      { path: 'list', component: RentListComponent },
      { path: 'detail', component: RentDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
