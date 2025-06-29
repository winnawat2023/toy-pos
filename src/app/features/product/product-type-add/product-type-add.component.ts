import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ProductType } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-type-add',
  templateUrl: './product-type-add.component.html',
  styleUrls: ['./product-type-add.component.css']
})
export class ProductTypeAddComponent implements OnInit {

  productType: ProductType = new ProductType();
  productTypeForm: FormGroup;
  shopName='';

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private shopService: ShopService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('ProductTypeAddComponent ngOnInit',this.shopService.currentShop);
    if (this.shopService.currentShop) {
      this.shopName=this.shopService.currentShop.title;
    }else{
      this.router.navigate(['/product/type/list']);
    }
    this.productTypeForm = this.fb.group({
      shopKey: [this.shopService.currentShop.key, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      published: [false, Validators.required]
    });
  }

  create(): void {
    console.log('ProductTypeAddComponent create',this.productTypeForm.value);
    this.productType = this.productTypeForm.value;
    this.productService.createProductType(this.productType).then(() => {
      console.log('Created new item successfully!');
      this.goBack();
    });
  }

  goBack(){
    this.router.navigate(['/product/type/list']);
  }
}
