import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Shop } from 'src/app/model/shop.model';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  private dbPath = '/restaurants';
  currentShop:Shop;

  restaurantsRef: AngularFireList<Shop>;

  constructor(private db: AngularFireDatabase) {
    this.restaurantsRef = db.list(this.dbPath);
  }

  getDBPath(){
    return this.dbPath;
  }

  setCurrentShop(shop:Shop){
    this.currentShop=shop;
  }

  getCurrentShop(){
    return this.currentShop;
  }

  getAll(): AngularFireList<Shop> {
    return this.restaurantsRef;
  }

  create(shop: Shop): any {
    return this.restaurantsRef.push(shop);
  }

  update(shop:Shop): Promise<void> {
    return this.restaurantsRef.update(shop.key, shop);
  }

  delete(key: string): Promise<void> {
    return this.restaurantsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.restaurantsRef.remove();
  }

  getShopStatus(status:boolean){
    if(status){
      return "ใช้งาน";
    }else{
      return "ตรวจสอบ";
    }
  }
}