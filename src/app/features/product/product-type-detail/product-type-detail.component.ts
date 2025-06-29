import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ProductType } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-type-detail',
  templateUrl: './product-type-detail.component.html',
  styleUrls: ['./product-type-detail.component.css']
})
export class ProductTypeDetailComponent implements OnInit {

  productTypeForm: FormGroup;
  shopName = "";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.productTypeForm = this.fb.group({
      key: [null, Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      shopKey: [null, Validators.required],
      published: [null, Validators.required]
    });
    if (this.productService.currentProductType && this.shopService.currentShop) {
      this.shopName = this.shopService.currentShop.title;
      this.productTypeForm.get("key").setValue(this.productService.currentProductType.key);
      this.productTypeForm.get("title").setValue(this.productService.currentProductType.title);
      this.productTypeForm.get("shopKey").setValue(this.productService.currentProductType.shopKey);
      this.productTypeForm.get("published").setValue(this.productService.currentProductType.published);
    } else {
      this.router.navigate(['/product/type/list']);
    }
  }

  deleteProductType() {
    this.productService.deleteProductType(this.productService.currentProductType);
    this.getBack();
  }

  updateProductType() {
    let productType : ProductType = this.productTypeForm.value;
    this.productService.updateProductType(productType);
    this.getBack();
  }

  getBack() {
    this.router.navigate(['/product/type/list']);
  }

}
