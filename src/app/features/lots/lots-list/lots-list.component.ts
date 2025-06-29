import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LotsService } from 'src/app/core/services/lots.service';
import { Lots } from 'src/app/model/lots';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-rent-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.css']
})
export class LotsListComponent implements OnInit {

  lots: Lots[];
  totalRent:number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private lotsService: LotsService) { }

  ngOnInit(): void {
    this.refreshLotsList();
  }

  refreshLotsList(): void {
    this.retrieveLots();
  }

  refreshExpenseList(): void {
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
      this.calTotalRent();
    });
  }

  calTotalRent(){
    this.totalRent=0;
    for(let lot of this.lots){
      this.totalRent += lot.rent;
    }
  }

 
  showDetail(lots: Lots) {
    this.lotsService.currentLots = lots;
    this.router.navigate(['/lots/detail']);
  }

  deleteLot(lot: Lots) {
    this.lotsService.delete(lot).then(() => this.calTotalRent())
    .catch(err => console.log(err));
  }

  getImagePath(shop:Shop){
    if(shop.image){
      return shop.image;
    }else{
      return "../../../../assets/images/user.png";
    }
  }

}
