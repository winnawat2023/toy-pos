import { Product, ProductType } from "./product.model";
import { Shop } from "./shop.model";

export class Receipt {
  shop: Shop;
  productType?: ProductType;
  product?: Product
  quantity?: number;
  price?: number;
}

export class ReceiptHistory {
  key?: string | null;
  receipts: Receipt[];
  total:number;
  image?:any;
  createBy:any;
  createTime:any;
  updateBy:any;
  updateTime:any;
}