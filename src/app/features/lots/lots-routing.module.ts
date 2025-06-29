import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { LotsAddComponent } from './lots-add/lots-add.component';
import { LotsListComponent } from './lots-list/lots-list.component';
import { LotsDetailComponent } from './lots-detail/lots-detail.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LotsListComponent },
      { path: 'add', component: LotsAddComponent },
      { path: 'detail', component: LotsDetailComponent },
      { path: 'list', component: LotsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotsRoutingModule { }
