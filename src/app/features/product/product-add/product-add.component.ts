import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  shopName: string = '';
  productTypeName: string = '';
  selectedFiles?: FileList;
  imageURL="../../../../assets/images/user.png";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private shopService: ShopService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      shopKey: [null, Validators.required],
      productTypeKey: [null, Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      published: [false, Validators.required],
      image: [null, Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
    if (this.shopService.currentShop && this.productService.currentProductType) {
      this.productForm.get("shopKey").setValue(this.shopService.currentShop.key);
      this.productForm.get("productTypeKey").setValue(this.productService.currentProductType.key);
      this.shopName = this.shopService.currentShop.title;
      this.productTypeName = this.productService.currentProductType.title;
    } else {
      this.router.navigate(['/product']);
    }
  }

  addProduct() {
    console.log('add product', this.productForm.value);
    let product: Product = this.productForm.value;
    this.productService.createProduct(product);
    this.router.navigate(['/product']);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const file: File | null = this.selectedFiles.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.imageURL=e.target.result;
      this.productForm.get("image").setValue(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  getBack(){
    this.router.navigate(['/product']);
  }
  

}
