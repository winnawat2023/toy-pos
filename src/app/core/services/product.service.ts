import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product, ProductType } from 'src/app/model/product.model';
import { Shop } from 'src/app/model/shop.model';
import { getDatabase, ref, query, orderByChild, equalTo } from "firebase/database";

@Injectable({
  providedIn: 'root'
})

export class ProductService {


  private dbPathRestaurants = '/restaurants';
  private dbPathProducts = '/products';
  private dbPathProductType = '/product_type';

  shopRef: AngularFireList<Shop>;
  productsRef: AngularFireList<Product>;
  productTypeRef: AngularFireList<ProductType>;

  currentProductType?:ProductType;
  currentShop?:Shop;
  currentProduct?:Product;

  constructor(private db: AngularFireDatabase) {
    this.shopRef = db.list(this.dbPathRestaurants);
    this.productsRef = db.list(this.dbPathProducts);
  }

  getDBPathProducts(){
    return this.dbPathProducts;
  }

  getAllShop(): AngularFireList<Shop> {
    return this.shopRef;
  }

  getAllProductByType(type:ProductType): AngularFireList<Product> {
    this.productsRef = this.db.list(this.dbPathProducts, ref => ref.orderByChild('productTypeKey').equalTo(type.key))
    return this.productsRef;
  }

  createProductType(productType: ProductType): any {
    return this.productTypeRef.push(productType);
  }

  createProduct(product: Product): any {
    return this.productsRef.push(product);
  }

  getProductType(shop: Shop): AngularFireList<ProductType> {
    this.productTypeRef = this.db.list(this.dbPathProductType, ref => ref.orderByChild('shopKey').equalTo(shop.key))
    return this.productTypeRef;
  }

  getProductTypeByShopKey(shopKey): AngularFireList<ProductType> {
    this.productTypeRef = this.db.list(this.dbPathProductType, ref => ref.orderByChild('shopKey').equalTo(shopKey))
    return this.productTypeRef;
  }



  setProductType(productType:ProductType){
    this.currentProductType=productType;
  }

  deleteProductType(product: ProductType): Promise<void> {
    return this.productTypeRef.remove(product.key);
  }

  deleteProduct(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  updateProduct(product:Product): Promise<void> {
    return this.productsRef.update(product.key, product);
  }

  updateStock(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  updateProductType(productType: ProductType): Promise<void> {
    return this.productTypeRef.update(productType.key,productType);
  }

}
