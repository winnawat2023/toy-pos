import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/core/services/customer.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
 
  customers?: Customer[];

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private customerService:CustomerService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Toy Cafe & Wine - Customers');
    this.logger.log('Customers loaded');
    this.notificationService.openSnackBar('Customers loaded');
    this.retrieveCustomer();
  }

  setActiveCustomer(customer:Customer){
    this.customerService.currentCustomer = customer;
  }

  refreshList(): void {
    this.retrieveCustomer();
  }

  retrieveCustomer(): void {
    this.customerService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('customers',data);
      this.customers = data;
    });
  }

  setActiveShop(customer: Customer): void {
    this.customerService.currentCustomer = customer;
  }
}

