import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableRoutingModule } from './table.routing.module';
import { TableListComponent } from './table-list/table-list.component';
import { TableDetailComponent } from './table-detail/table-detail.component';

@NgModule({
  declarations: [ TableListComponent,TableDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableRoutingModule
  ]
})
export class TableModule { }
