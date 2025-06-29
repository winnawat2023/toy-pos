import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LotsRoutingModule } from './lots-routing.module';
import { LotsAddComponent } from './lots-add/lots-add.component';
import { LotsDetailComponent } from './lots-detail/lots-detail.component';
import { LotsListComponent } from './lots-list/lots-list.component';



@NgModule({
  declarations: [LotsDetailComponent,LotsAddComponent,LotsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LotsRoutingModule
  ]
})

export class LotsModule { }


