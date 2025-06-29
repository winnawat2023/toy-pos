import { Shop } from "./shop.model";

export class Lots {
    key?: string | null;
    lotNumber:string;
    waterMeterNumber:string;
    electricityMeterNumber:string;
    rent:number;
    shop:Shop;
  }
