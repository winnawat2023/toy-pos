import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Customer } from 'src/app/model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private dbPath = '/customers';
  customerRef: AngularFireList<Customer>;
  currentCustomer:Customer;

  constructor(private db: AngularFireDatabase) {
    this.customerRef = db.list(this.dbPath);
  }

  getCurrentCustomer(){
    return this.currentCustomer
  }

  setCurrentCustomer(customer:Customer){
    this.currentCustomer = customer;
  }

  getAll(): AngularFireList<Customer> {
    return this.customerRef;
  }

  create(customer: Customer): any {
    return this.customerRef.push(customer);
  }

  update(customer: Customer): Promise<void> {
    return this.customerRef.update(customer.key, customer);
  }

  delete(customer: Customer): Promise<void> {
    return this.customerRef.remove(customer.key);
  }

}
