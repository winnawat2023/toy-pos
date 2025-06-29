import { Customer } from "./customer";
import { Payment } from "./payment";
import { Product, ProductType } from "./product.model";
import { Shop } from "./shop.model";

export class Order {
  shop: Shop;
  productType?: ProductType;
  product?: Product
  quantity?: number;
  total?:number;
}

export class OrderHistory {
  key?: string | null;
  customer:Customer;
  orders: Order[];
  total:number;
  createBy:any;
  createTime:string;
  updateBy:any;
  updateTime:string;
  payment:Payment;
}