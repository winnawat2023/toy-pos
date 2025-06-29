import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ProductType, Product } from 'src/app/model/product.model';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  error: string;
  msgClass: string;
  loading = false;

  shops?:Shop[];
  types?: ProductType[];
  procucts?:Product[];

  fillterForm: FormGroup;
  tableForm: FormGroup;
  show=-1;
  
  constructor(
    private shopService: ShopService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,) { }

    ngOnInit(): void {
      this.tableForm = new FormGroup({});
      this.tableForm.addControl('stockForm', this.fb.array([]));
      this.fillterForm = this.fb.group({
        shop: [],
        type:[]
      });
    /*  this.tableForm = this.fb.group({
        stock:[0]
      });*/
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
        this.tableForm.removeControl('stockForm');
        this.tableForm.addControl('stockForm', this.fb.array([]));
        console.log('tableForm',this.tableForm);
        const stockForm = this.tableForm.controls.stockForm as FormArray;
        console.log('stockForm',stockForm);
        for (let product of this.procucts) {
          let fg = this.fb.group({
            stock: product.stock
          });

          stockForm.push(fg);
        }
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

    getImagePath(product:Product){
      if(product.image){
        return product.image;
      }else{
        return "../../../../assets/images/user.png";
      }
    }

    updateStock(index:number,product:Product){
      this.show=index;
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.show = -1;
    }, 2000);
    
      this.error = "";
      this.loading = true;
      product.stock=this.tableForm.get('stockForm').value[index].stock
      this.productService.updateProduct(product);
      this.loading = false;
      this.error = 'successful';
        this.msgClass = "alert alert-success";
     /* this.swpService.search(swpNo).pipe(first()).subscribe(data => {
        this.loading = false;
        let res = new ResponseServlet();
        res = JSON.parse(JSON.stringify(data));
        if (res.status === 200) {
    }, error => {
      this.loading = false;
      this.error = error.message;
      this.msgClass = "alert alert-danger";
    });
    }*/
  }

}
