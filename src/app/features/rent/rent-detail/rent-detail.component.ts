import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LotsService } from 'src/app/core/services/lots.service';
import { RentService } from 'src/app/core/services/rent.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Lots } from 'src/app/model/lots';
import { Rent } from 'src/app/model/rent';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './rent-detail.component.html',
  styleUrls: ['./rent-detail.component.css']
})
export class RentDetailComponent implements OnInit {

  rentForm: FormGroup;
  currentLots: Lots;
  month:string;
  
  constructor( 
    private rentService: RentService,
    private lotsService: LotsService,
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.rentForm = this.fb.group({
      key:[null,Validators.required],
      lotNumber: [null, [Validators.required, Validators.minLength(3)]],
      waterMeterNumber: [null, [Validators.required, Validators.minLength(5)]],
      electricityMeterNumber: [null, Validators.required],
      rent:[null,Validators.required],

      lastElectricityMeter:[null,Validators.required],
      currentElectricityMeter:[null,Validators.required],
      totalElectricityMeter:[null,Validators.required],
      electricityPrice:[10,Validators.required],
      totalElectricity:[null,Validators.required],

      lastMeterWater:[null,Validators.required],
      currentMeterWater:[null,Validators.required],
      totalMeterWater:[null,Validators.required],
      waterPrice:[20,Validators.required],
      totalWater:[null,Validators.required],
      total:[null,Validators.required],
    });

    if (this.lotsService.currentLots) {
      this.currentLots = this.lotsService.currentLots;
      this.rentForm.get("key").setValue(this.currentLots.key);
      this.rentForm.get("lotNumber").setValue(this.currentLots.lotNumber);
      this.rentForm.get("waterMeterNumber").setValue(this.currentLots.waterMeterNumber);
      this.rentForm.get("electricityMeterNumber").setValue(this.currentLots.electricityMeterNumber);
      this.rentForm.get("rent").setValue(this.currentLots.rent);
      console.log('yyyy-mm : ',this.route.snapshot.paramMap.get('month'));
      this.month = this.route.snapshot.paramMap.get('month');
    } else {
      this.router.navigate(['/rent']);
    }
  }

  calElectricityMeter(){
    let lastElectricityMeter = this.rentForm.get("lastElectricityMeter").value;
    let currentElectricityMeter = this.rentForm.get("currentElectricityMeter").value;
    let totalElectricityMeter = currentElectricityMeter - lastElectricityMeter;
    let totalElectricity = totalElectricityMeter*this.rentForm.get("electricityPrice").value;
    this.rentForm.get("totalElectricityMeter").setValue(totalElectricityMeter);
    this.rentForm.get("totalElectricity").setValue(totalElectricity);
  }

  calWaterMeter(){
    let lastMeterWater = this.rentForm.get("lastMeterWater").value;
    let currentMeterWater = this.rentForm.get("currentMeterWater").value;
    let totalMeterWater = currentMeterWater-lastMeterWater;
    let waterPrice = totalMeterWater*this.rentForm.get("waterPrice").value;
    this.rentForm.get("totalMeterWater").setValue(totalMeterWater);
    this.rentForm.get("totalWater").setValue(waterPrice);
  }

  addRent() {
    let rent:Rent = this.rentForm.value;
    console.log('rent : ',rent);
  //  this.rentService.create();
  }

  goBack(){
    this.router.navigate(['/rent']);
  }
}
