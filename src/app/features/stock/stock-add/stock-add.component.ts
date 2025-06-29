import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { StockService } from 'src/app/core/services/stock.service';
import { ProductType, Product } from 'src/app/model/product.model';
import { Receipt, ReceiptHistory } from 'src/app/model/receipt';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  shops?:Shop[];
  types?: ProductType[];
  products?:Product[];
  receipts?:Receipt[]
  total:number=0;
  imageURL="../../../../assets/images/user.png";
  selectedFiles?: FileList;

  
  receiptForm:FormGroup;

  constructor(
    private shopService: ShopService,
    private router: Router,
    private stockService: StockService,
    private productService : ProductService,
    private fb: FormBuilder,
    private authService:AuthenticationService) { }

    ngOnInit(): void {
      this.receipts = [];
      this.receiptForm = this.fb.group({
        shop:[null,Validators.required],
        productType:[null,Validators.required],
        product:[null, Validators.required],
        quantity:[null,[Validators.required]],
        price:[null,[Validators.required]],

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
          this.receiptForm.get("shop").setValue(this.shops[0]);
          this.retrieveProductType();
        }
      });
    }
  
    retrieveProductType(): void {
      let shop:Shop = this.receiptForm.get("shop").value;
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
          this.receiptForm.get("productType").setValue(this.types[0]);
          this.refreshProductList();
        }
        
      });
    }
  
    refreshProductList(): void {
      this.retrieveProduct();
    }
  
    retrieveProduct(): void {
      let type:ProductType = this.receiptForm.get("productType").value;
      this.productService.getAllProductByType(type).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.products = data;     
        console.log(this.products);
      });
    }
  
    shopChange(){
      console.log('shopChange',this.receiptForm.get("shop").value);
      this.retrieveProductType();
    }
    
    typeChange(){
      console.log('typeChange',this.receiptForm.get("type").value);
      this.retrieveProduct();
    }

    getImagePath(product:Product){
      if(product.image){
        return product.image;
      }else{
        return "../../../../assets/images/user.png";
      }
    }

    save(){
      let receiptHistory :ReceiptHistory = new ReceiptHistory;
      receiptHistory.createBy=this.authService.getCurrentUser();
      receiptHistory.createTime=new Date();
      receiptHistory.image=this.imageURL;
      receiptHistory.receipts=this.receipts;
      receiptHistory.total=this.total;
      receiptHistory.updateBy=this.authService.getCurrentUser();;
      receiptHistory.updateTime=receiptHistory.createTime;
      console.log(receiptHistory);
     
      this.stockService.create(receiptHistory).then(() => {
        for(let receipt of receiptHistory.receipts){
          let stock = {"stock":receipt.product.stock+receipt.quantity};
          this.productService.updateStock(receipt.product.key, stock);
        }
        this.getBack();
      })
      .catch(err => console.log(err));
    }

    getBack(){
      this.router.navigate(['/stock']);
    }

    addReceipt(){
      let receipt:Receipt = this.receiptForm.value;
     
      this.receipts.push(receipt);
      this.total = this.total+receipt.price;
      this.reset();
    }

    reset(){
      this.receiptForm.get("product").setValue(null);
      this.receiptForm.get("quantity").setValue(null);
      this.receiptForm.get("price").setValue(null);
    }

    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      const file: File | null = this.selectedFiles.item(0);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL=e.target.result;
      };
      reader.readAsDataURL(file);
    }

    deleteReceipt(receipt:Receipt){
      const startIndex = this.receipts.indexOf(receipt);
      const deleteCount = 1;
      this.receipts.splice(startIndex,deleteCount);
      this.total = this.total-receipt.price;
    }
}

