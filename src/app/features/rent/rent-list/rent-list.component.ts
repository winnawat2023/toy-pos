import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { LotsService } from 'src/app/core/services/lots.service';
import { RentService } from 'src/app/core/services/rent.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Lots } from 'src/app/model/lots';
import { Rent, RentHistory } from 'src/app/model/rent';
import { Shop } from 'src/app/model/shop.model';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment} from 'moment';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'YYYY-MMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class RentListComponent implements OnInit {

  fillterForm: FormGroup;
  months: any[];
  lots: Lots[];
  rentHistory: RentHistory[];
  rents: Rent[];
  summary: number;
  summaryElectricity: number;
  summaryWater: number;
  summaryRent: number;
  shops: Shop[];


  constructor(
    private shopService: ShopService,
    private router: Router,
    private fb: FormBuilder,
    private walletService: WalletService,
    private rentService: RentService,
    private lotsService: LotsService,
    private datepipe: DatePipe,
    private authService: AuthenticationService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
   // this.months = this.getMonth();
    let m = moment().subtract(1, 'month');
    
    this.fillterForm = this.fb.group({
      month: [m, Validators.required],
      shop: [null]
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
      this.lots = data;
      this.onSearchRent();
    });
  }

  onSearchRent() {
    this.rents = [];
    let month = this.fillterForm.get('month').value.format('YYYY-MMM');
    console.log('month : ', month);
    this.rentService.searchRentByMonth(month).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.rents = data;
      console.log('rents : ', this.rents);
      this.mergeData();
    });
  }

  mergeData() {
    this.summary = 0;
    this.summaryElectricity = 0;
    this.summaryWater = 0;
    this.summaryRent = 0;
    this.rentHistory = [];
    for (let lot of this.lots) {
      let history = new RentHistory();
      history.lot = lot;
      history.rent = this.getRentByLot(lot.key);
      this.rentHistory.push(history);
      if (history.rent) {
        this.summary += history.rent.totalPrice;
        this.summaryElectricity += history.rent.totalElectricity;
        this.summaryRent += history.rent.rent;
        this.summaryWater += history.rent.totalWater;
      }
    }
    console.log('rentHistory ', this.rentHistory);
  }

  getRentByLot(key) {
    for (let rent of this.rents) {
      if (rent.lotKey == key) {
        return rent;
      }
    }
    return null;
  }

  dateChange() {
    this.onSearchRent();
  }

  addRent(lot: Lots) {
    console.log('addRent');
    this.lotsService.currentLots = lot;
    this.router.navigate(['/rent/add', { month: this.fillterForm.get("month").value }]);
  }

  updateRent(rentHistory: RentHistory) {
    this.rentService.currentRentHistory = rentHistory;
    this.router.navigate(['/rent/detail', { month: this.fillterForm.get("month").value }]);
  }

  getMonth() {
    let startDate = new Date('2023-11-01');
    console.log('startDate : ', startDate);
    let endDate = new Date();
    let months = [];
    months.push(this.datepipe.transform(startDate, "YYYY-MMM"));
    while (startDate.getTime() < endDate.getTime()) {
      startDate.setMonth(startDate.getMonth()-1);
      months.push(this.datepipe.transform(startDate, "YYYY-MMM"));
    }
    return months;
  }

  getDataRent(rentHistory: RentHistory, coumn: string) {
    if (rentHistory.rent) {
      return rentHistory.rent[coumn];
    }
    return 0;
  }

  getDetailElectricity(history: RentHistory, coumn: string) {
    if (history.rent) {
      return '(' + history.rent['currentElectricityMeter'] + ' - ' + history.rent['lastElectricityMeter'] + ' = ' + history.rent['totalElectricityMeter'] + ' ยูนิต)'
    }
    return '';
  }

  getDetailWater(history: RentHistory, coumn: string) {
    if (history.rent) {
      return '(' + history.rent['currentMeterWater'] + ' - ' + history.rent['lastMeterWater'] + ' = ' + history.rent['totalMeterWater'] + ' ยูนิต)'
    }
    return '';
  }

  getImagePath(shop: Shop) {
    if (shop.image) {
      return shop.image;
    } else {
      return "../../../../assets/images/user.png";
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
      if (this.shops) {
        this.fillterForm.get("shop").setValue(this.shops[0]);
        this.shopService.currentShop = this.fillterForm.get("shop").value;
      }
    });
  }

  onShopChange() {
    let shop = this.fillterForm.get('shop').value;
    this.lotsService.getLotsByShop(shop).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.lots = [];
      for (let l of data) {
        console.log(l.shop.title + ' ' + shop.title);
        if (l.shop.key == shop.key) {
          this.lots.push(l);
        }
      }
      // this.lots = data;

      this.onSearchRent();
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.fillterForm.get('month').value;
    ctrlValue.year(normalizedYear.year());
    this.fillterForm.get('month').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.fillterForm.get('month').value;
    ctrlValue.month(normalizedMonth.month());
    this.fillterForm.get('month').setValue(ctrlValue);
    datepicker.close();
    this.onSearchRent();
  }

}
