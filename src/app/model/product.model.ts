export class Product {
  key?: string | null;
  shopKey: string;
  title?: string;
  description?: string;
  published?: boolean;
  productTypeKey?: string;
  image?:any;
  stock?:number;
  price?:number;
}
export class ProductType {
  key?: string | null;
  title?: string;
  shopKey: string;
  published?: boolean;
}
