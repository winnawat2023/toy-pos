import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Product, ProductType } from 'src/app/model/product.model';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm: FormGroup;
  currentProduct:Product;
  selectedFiles?: FileList;
  imageURL="../../../../assets/images/user.png";
  types?: ProductType[];
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private shopService:ShopService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      key: [null,Validators.required],
      shopKey: [null,Validators.required],
      title: [null,[Validators.required,Validators.minLength(3)]],
      description: [null,[Validators.required,Validators.minLength(5)]],
      published: [null,Validators.required],
      productTypeKey: [null,Validators.required],
      image:[null,Validators.required],
      stock:[0,Validators.required],
      price:[0,Validators.required]
    });
    if(this.productService.currentProduct){
      this.currentProduct = this.productService.currentProduct;
      console.log(this.currentProduct);
      this.productForm.get("key").setValue(this.currentProduct.key);
      this.productForm.get("shopKey").setValue(this.currentProduct.shopKey);
      this.productForm.get("title").setValue(this.currentProduct.title);
      this.productForm.get("description").setValue(this.currentProduct.description);
      this.productForm.get("published").setValue(this.currentProduct.published);
      this.productForm.get("productTypeKey").setValue(this.currentProduct.productTypeKey);
      this.productForm.get("image").setValue(this.currentProduct.image);
      this.productForm.get("stock").setValue(this.currentProduct.stock);
      this.productForm.get("price").setValue(this.currentProduct.price);
      this.imageURL = this.currentProduct.image;
      this.retrieveProductType(this.currentProduct.shopKey);
    }else{
      this.router.navigate(['/product']);
    }
  }

  deleteProduct(){
    this.productService.deleteProduct(this.currentProduct.key);
    this.router.navigate(['/product']);
  }

  updateProduct(){
    this.currentProduct = this.productForm.value;
    this.productService.updateProduct(this.currentProduct);
    this.router.navigate(['/product/list']);
  }

  getBack(){
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

  typeChange(){
  
  }

  retrieveProductType(shopKey): void {
   
    console.log('retrieveProductType',shopKey);
    this.productService.getProductTypeByShopKey(shopKey).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('retrieveProductType',data);
      this.types = data;
     
      if (this.types) {
       // this.orderForm.get("type").setValue(this.types[0]);
       
      }

    });
  }

}
