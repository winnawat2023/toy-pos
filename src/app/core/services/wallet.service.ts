import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Wallet } from 'src/app/model/wallet';

@Injectable({
  providedIn: 'root'
})


export class WalletService {

  private dbPath = '/wallet';
  currentWallet:Wallet;

  walletRef: AngularFireList<Wallet>;

  constructor(private db: AngularFireDatabase,public datepipe: DatePipe) {
    this.walletRef = db.list(this.dbPath);
    console.log("constructor walletRef",this.walletRef);
  }

  getAll(): AngularFireList<Wallet> {
    return this.walletRef;
  }

  create(wallet: Wallet): any {
    return this.walletRef.push(wallet);
  }

  update(wallet: Wallet): Promise<void> {
    return this.walletRef.update(wallet.key, wallet);
  }

}
