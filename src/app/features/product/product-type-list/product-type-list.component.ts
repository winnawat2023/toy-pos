import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ProductType } from 'src/app/model/product.model';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {

  shops?:Shop[];
  types?: ProductType[];
  shopForm: FormGroup;

  constructor(
    private shopService: ShopService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      shop: []
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
        this.shopForm.get("shop").setValue(this.shops[0]);
        this.shopService.currentShop = this.shopForm.get("shop").value;
        this.retrieveProductType();
      }
    });
  }

  shopChange(){
    console.log('shopChange',this.shopForm.get("shop").value);
    this.shopService.currentShop = this.shopForm.get("shop").value;
    this.retrieveProductType();
  }

  retrieveProductType(): void {
    let shop:Shop = this.shopForm.get("shop").value;
    this.productService.getProductType(shop).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.types = data;
      console.log(this.types);
    });
  }

  getTypeStatus(status){
    this.shopService.getShopStatus(status);
  }

  setActiveType(productType:ProductType){
    this.productService.currentProductType = productType;
    this.router.navigate(['/product/type/detail']);
  }

  addType(){
    this.shopService.currentShop = this.shopForm.get("shop").value;
    this.router.navigate(['/product/type/add']);
  }
}
