import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentAddComponent } from './rent-add/rent-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RentDetailComponent } from './rent-detail/rent-detail.component';
import { RentListComponent } from './rent-list/rent-list.component';
import { RentRoutingModule } from './rent.-routing.module';



@NgModule({
  declarations: [RentAddComponent,RentDetailComponent,RentListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RentRoutingModule
  ]
})

export class RentModule { }


