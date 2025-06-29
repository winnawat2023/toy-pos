import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LotsService } from 'src/app/core/services/lots.service';
import { RentService } from 'src/app/core/services/rent.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Lots } from 'src/app/model/lots';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './lots-detail.component.html',
  styleUrls: ['./lots-detail.component.css']
})
export class LotsDetailComponent implements OnInit {

  lotsForm: FormGroup;
  currentLots: Lots;
  shops?:Shop[];
  
  constructor( 
    private lotsService: LotsService,
    private router: Router,
    private shopService: ShopService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.lotsForm = this.fb.group({
      key:[null,Validators.required],
      lotNumber: [null, [Validators.required, Validators.minLength(3)]],
      waterMeterNumber: [null, [Validators.required, Validators.minLength(5)]],
      electricityMeterNumber: [null, Validators.required],
      rent:[null,Validators.required],
      shop:[null,Validators.required]
    });

    if (this.lotsService.currentLots) {
      this.currentLots = this.lotsService.currentLots;
      this.lotsForm.get("key").setValue(this.currentLots.key);
      this.lotsForm.get("lotNumber").setValue(this.currentLots.lotNumber);
      this.lotsForm.get("waterMeterNumber").setValue(this.currentLots.waterMeterNumber);
      this.lotsForm.get("electricityMeterNumber").setValue(this.currentLots.electricityMeterNumber);
      this.lotsForm.get("rent").setValue(this.currentLots.rent);
      this.lotsForm.get("shop").setValue(this.currentLots.shop);
      this.refreshShopList();
      
    } else {
      this.router.navigate(['/lots']);
    }
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
        this.lotsForm.get("shop").setValue(this.shops[0]);
        this.shopService.currentShop = this.lotsForm.get("shop").value;
      }
    });
  }


  updateLots(){
    this.currentLots = this.lotsForm.value;
    this.lotsService.update(this.currentLots)
    .then(() => this.goBack())
    .catch(err => console.log(err));
  }

  goBack(){
    this.router.navigate(['/lots']);
  }

  shopChange(){
    console.log('shopChange',this.lotsForm.get("shop").value);
    this.shopService.currentShop = this.lotsForm.get("shop").value;
  }

}
