import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LotsService } from 'src/app/core/services/lots.service';
import { RentService } from 'src/app/core/services/rent.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Lots } from 'src/app/model/lots';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-lots-add',
  templateUrl: './lots-add.component.html',
  styleUrls: ['./lots-add.component.css']
})

export class LotsAddComponent implements OnInit {

  lotsForm: FormGroup;
  lots: Lots[];
  shops?:Shop[];

  constructor(
    private shopService: ShopService,
    private rentService: RentService,
    private lotsService: LotsService,
    private router: Router,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.lots = [];
    this.lotsForm = this.fb.group({
      lotNumber:[null,Validators.required],
      waterMeterNumber:[null,Validators.required],
      electricityMeterNumber:[null,Validators.required],
      rent:[4500,Validators.required],
      shop:[null,Validators.required]
    });
    this.refreshLotsList();
    this.refreshShopList();
  }

  refreshLotsList(): void {
    this.retrieveLots();
  }

  retrieveLots(): void {
    this.lotsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {

    });
  }

  createLot(){
    console.log('createLot ',this.lotsForm.value);
    this.lotsService.create(this.lotsForm.value).then(() => {
      this.goBack();
    })
  }

  goBack(){
    this.router.navigate(['/lots']);
  }

  shopChange(){
    console.log('shopChange',this.lotsForm.get("shop").value);
    this.shopService.currentShop = this.lotsForm.get("shop").value;
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

}
