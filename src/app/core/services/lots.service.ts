import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Lots } from 'src/app/model/lots';
import { Shop } from 'src/app/model/shop.model';

@Injectable({
  providedIn: 'root'
})
export class LotsService {

  private dbPath = '/lots';
  currentLots:Lots;

  rentRef: AngularFireList<Lots>;

  constructor(
    private db: AngularFireDatabase,
    public datepipe: DatePipe) {
    this.rentRef = db.list(this.dbPath);
    console.log("constructor rentRef",this.rentRef);
  }

  getAll(): AngularFireList<Lots> {
    return this.rentRef;
  }

  getLotsByShop(shop:Shop): AngularFireList<Lots> {
   // return this.rentRef;
    return this.rentRef = this.db.list(this.dbPath, ref => ref.orderByChild('shop'));
  }

  create(lot: Lots): any {
    return this.rentRef.push(lot);
  }

  update(lot: Lots): Promise<void> {
    return this.rentRef.update(lot.key, lot);
  }

  delete(lot: Lots): Promise<void> {
    return this.rentRef.remove(lot.key);
  }

}
