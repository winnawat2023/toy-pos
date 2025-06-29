import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customerForm: FormGroup;
  currentCustomer:Customer;

  constructor(
    private customerService: CustomerService, 
    private router: Router, 
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.customerForm = this.fb.group({
      key:[null,Validators.required],
      name:[null,Validators.required],
      mobile:['']
    });

    if (this.customerService.currentCustomer) {
      this.currentCustomer = this.customerService.currentCustomer;
      this.customerForm.get("key").setValue(this.currentCustomer.key);
      this.customerForm.get("name").setValue(this.currentCustomer.name);
      this.customerForm.get("mobile").setValue(this.currentCustomer.mobile); 
    } else {
      this.back();
    }

  }

  back(){
    this.router.navigate(['/customers']);
  }

  delete(){
    this.customerService.delete(this.currentCustomer);
    this.back();
  }

  save(){
    this.customerService.update(this.customerForm.value);
    this.back();
  }

}
