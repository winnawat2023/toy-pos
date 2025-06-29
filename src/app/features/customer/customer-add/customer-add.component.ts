import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/model/customer';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      mobile: ['']
    });
  }

  save(): void {
    let customer:Customer = this.customerForm.value;
    this.customerService.create(customer).then(() => {
      console.log('create customer successfully! ',customer);
      this.goBack();
    });
  }

  goBack(){
    this.router.navigate(['/customers']);
  }


}
