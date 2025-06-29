import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Lots } from 'src/app/model/lots';
import { Rent, RentHistory } from 'src/app/model/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private dbPath = '/rent';
  currentRentHistory:RentHistory;

  rentRef: AngularFireList<Rent>;

  constructor(
    private db: AngularFireDatabase,
    public datepipe: DatePipe) {
    this.rentRef = db.list(this.dbPath);
    console.log("constructor rentRef", this.rentRef);
  }



  searchRentByMonth(month: string): AngularFireList<Rent> {
    return this.rentRef = this.db.list(this.dbPath, ref => ref.orderByChild('month').equalTo(month));
  }

  searchLastMonth(month: string, lot: Lots): AngularFireList<Rent> {
    return this.rentRef = this.db.list(this.dbPath, ref => ref.orderByChild('month').equalTo(month));
  }

  create(rentHistory: Rent): any {
    return this.rentRef.push(rentHistory);
  }

  update(rent: Rent): Promise<void> {
    return this.rentRef.update(rent.key, rent);
  }

  delete(rent: Rent): any {
    return this.rentRef.remove(rent.key);
  }

}
