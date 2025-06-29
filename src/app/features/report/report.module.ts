import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';
import { InoutWeeklyComponent } from './inout-weekly/inout-weekly.component';


@NgModule({
  declarations: [ InoutWeeklyComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule
  ],
})
export class ReportModule { }
