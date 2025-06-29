import { Component, OnInit, ViewChild } from '@angular/core';
import { Shop } from 'src/app/model/shop.model';
import { ProductService } from 'src/app/core/services/product.service';
import { Product, ProductType } from 'src/app/model/product.model';
import { ShopService } from 'src/app/core/services/shop.service';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  shops?:Shop[];
  types?: ProductType[];
  procucts?:Product[];

  fillterForm: FormGroup;

  constructor(
    private shopService: ShopService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.fillterForm = this.fb.group({
      shop: [],
      type:[]
    });
    this.refreshShopList();
  }

  refreshShopList(): void {
    this.retrieveShops();
  }

  retrieveShops(): void {
    this.shopService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.shops = data;
      if(this.shops){
        this.fillterForm.get("shop").setValue(this.shops[0]);
        this.retrieveProductType();
      }
    });
  }

  retrieveProductType(): void {
    let shop:Shop = this.fillterForm.get("shop").value;
    this.productService.getProductType(shop).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.types = data;
      console.log(this.types);
      if(this.types){
        this.fillterForm.get("type").setValue(this.types[0]);
        this.refreshProductList();
      }
      
    });
  }

  refreshProductList(): void {
    this.retrieveProduct();
  }

  retrieveProduct(): void {
    let type:ProductType = this.fillterForm.get("type").value;
    this.productService.getAllProductByType(type).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.procucts = data;     
    });
  }

  shopChange(){
    console.log('shopChange',this.fillterForm.get("shop").value);
    this.retrieveProductType();
  }
  
  typeChange(){
    console.log('typeChange',this.fillterForm.get("type").value);
    this.retrieveProduct();
  }

  addProduct(){
    this.shopService.currentShop = this.fillterForm.get("shop").value;
    this.productService.currentProductType = this.fillterForm.get("type").value;
    this.router.navigate(['/product/add']);
  }

  setActiveProduct(product:Product){
    this.productService.currentProduct=product;
    this.router.navigate(['/product/detail']);
  }

  getImagePath(product:Product){
    if(product.image){
      return product.image;
    }else{
      return "../../../../assets/images/user.png";
    }
  }
}
