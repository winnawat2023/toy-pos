import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { LotsService } from 'src/app/core/services/lots.service';
import { RentService } from 'src/app/core/services/rent.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Config } from 'src/app/model/config';
import { Lots } from 'src/app/model/lots';
import { Rent } from 'src/app/model/rent';

@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrls: ['./rent-add.component.css']
})
export class RentAddComponent implements OnInit {

  rentForm: FormGroup;
  currentLots: Lots;
  month: string;
  config: Config;
  lastRent : Rent;

  constructor(
    private shopService: ShopService,
    private rentService: RentService,
    private lotsService: LotsService,
    private router: Router,
    private authService: AuthenticationService,
    private datepipe: DatePipe,
    private fb: FormBuilder,
    private configService: ConfigService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rentForm = this.fb.group({
      key: [null, Validators.required],
      lotNumber: [null, [Validators.required, Validators.minLength(3)]],
      month: [null, Validators.required],
      rent: [null, Validators.required],

      waterMeterNumber: [null, [Validators.required, Validators.minLength(5)]],
      electricityMeterNumber: [null, Validators.required],

      lastElectricityMeter: [0, Validators.required],
      currentElectricityMeter: [null, Validators.required],
      totalElectricityMeter: [null, Validators.required],
      electricityPrice: [null, Validators.required],
      totalElectricity: [null, Validators.required],

      lastMeterWater: [0, Validators.required],
      currentMeterWater: [null, Validators.required],
      totalMeterWater: [null, Validators.required],
      waterPrice: [null, Validators.required],
      totalWater: [null, Validators.required],

      totalPrice: [null, Validators.required],
    });
    if (this.lotsService.currentLots) {
      this.currentLots = this.lotsService.currentLots;
      this.month= this.datepipe.transform(this.route.snapshot.paramMap.get('month'), 'yyyy-MMM');
      console.log('yyyy-mm : ', this.month);

      this.rentForm.get("lotNumber").setValue(this.currentLots.lotNumber);
      this.rentForm.get("rent").setValue(this.currentLots.rent);
      this.loadConfig();
      this.getLastMonth();
      this.calTotalPrice();
    } else {
      this.router.navigate(['/rent']);
    }

  }

  getLastMonth() {
    console.log('selected month ', this.month);
    let beforeMonth = new Date(this.month);
    beforeMonth.setMonth(beforeMonth.getMonth() - 1);
    let month = this.datepipe.transform(beforeMonth, 'yyyy-MMM');
    console.log('before month  ', month);

    this.rentService.searchLastMonth(month, this.lotsService.currentLots).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        console.log('lastRent : ', data);
        for(let r of data){
          if(this.currentLots.key==r.lotKey){
            this.lastRent=r;
            this.rentForm.get('lastElectricityMeter').setValue(this.lastRent.currentElectricityMeter);
            this.rentForm.get('lastMeterWater').setValue(this.lastRent.currentMeterWater);
            break;
          }
        }
    });
   
  }



  loadConfig() {
    this.configService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.config = data[0];
      this.rentForm.get("electricityPrice").setValue(this.config.electricityPrice);
      this.rentForm.get("waterPrice").setValue(this.config.waterPrice);
    });
  }

  calElectricityMeter() {
    let lastElectricityMeter = this.rentForm.get("lastElectricityMeter").value;
    let currentElectricityMeter = this.rentForm.get("currentElectricityMeter").value;
    let totalElectricityMeter = currentElectricityMeter - lastElectricityMeter;
    let totalElectricity = totalElectricityMeter * this.rentForm.get("electricityPrice").value;
    this.rentForm.get("totalElectricityMeter").setValue(totalElectricityMeter);
    this.rentForm.get("totalElectricity").setValue(totalElectricity);
    this.calTotalPrice();
  }

  calWaterMeter() {
    let lastMeterWater = this.rentForm.get("lastMeterWater").value;
    let currentMeterWater = this.rentForm.get("currentMeterWater").value;
    let totalMeterWater = currentMeterWater - lastMeterWater;
    let waterPrice = totalMeterWater * this.rentForm.get("waterPrice").value;
    this.rentForm.get("totalMeterWater").setValue(totalMeterWater);
    this.rentForm.get("totalWater").setValue(waterPrice);
    this.calTotalPrice();
  }

  calTotalPrice() {
    let totalPrice = this.currentLots.rent;
    let totalWater = this.rentForm.get("totalWater").value
    let totalElectricity = this.rentForm.get("totalElectricity").value
    this.rentForm.get("totalPrice").setValue(totalPrice + totalWater + totalElectricity);
  }


  addRent() {
    let rent: Rent = new Rent();
    rent.lotKey = this.currentLots.key;
    rent.month = this.month;
    rent.rent = this.currentLots.rent;

    rent.lastElectricityMeter = this.rentForm.get('lastElectricityMeter').value;
    rent.currentElectricityMeter = this.rentForm.get('currentElectricityMeter').value;
    rent.totalElectricityMeter = this.rentForm.get('totalElectricityMeter').value;
    rent.electricityPrice = this.rentForm.get('electricityPrice').value;
    rent.totalElectricity = this.rentForm.get('totalElectricity').value;

    rent.lastMeterWater = this.rentForm.get('lastMeterWater').value;
    rent.currentMeterWater = this.rentForm.get('currentMeterWater').value;
    rent.totalMeterWater = this.rentForm.get('totalMeterWater').value;
    rent.waterPrice = this.rentForm.get('waterPrice').value;
    rent.totalWater = this.rentForm.get('totalWater').value;
    rent.totalPrice = this.rentForm.get('totalPrice').value;
    console.log('rent : ', rent);
    this.rentService.create(rent).then(() => {
      this.goBack();
    })
  }

  goBack() {
    this.router.navigate(['/rent']);
  }
}
