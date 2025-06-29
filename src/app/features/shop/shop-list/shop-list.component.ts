import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { Shop } from 'src/app/model/shop.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  shops?: Shop[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.retrieveShops();
  }

  refreshList(): void {
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
      console.log('shops',data);
      this.shops = data;
    });
  }

  setActiveShop(shop: Shop): void {
    this.shopService.currentShop = shop;
  }

  getImagePath(shop:Shop){
    if(shop.image){
      return shop.image;
    }else{
      return "../../../../assets/images/user.png";
    }
  }

}
