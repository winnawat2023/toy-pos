import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@NgModule({
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerAddComponent,
        CustomerDetailComponent
    ]
})
export class CustomersModule { }
