import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Customer } from 'src/app/model/customer';
import { Order, OrderHistory } from 'src/app/model/order';
import { Product, ProductType } from 'src/app/model/product.model';
import { Shop } from 'src/app/model/shop.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { WalletService } from 'src/app/core/services/wallet.service';
import { Wallet } from 'src/app/model/wallet';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})

export class OrderAddComponent implements OnInit {

  customerForm: FormGroup;
  orderForm: FormGroup;
  paymentForm: FormGroup;

  customers?: Customer[];
  shops?: Shop[];
  types?: ProductType[];
  procucts?: Product[];
  orders?: Order[] = [];
  showCash: boolean = false;
  wallet:Wallet=new Wallet();

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private customerService: CustomerService,
    private shopService: ShopService,
    private productService: ProductService,
    private authService: AuthenticationService,
    private orderService: OrderService,
    private datepipe: DatePipe,
    private walletService:WalletService
  ) { }



  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: [null, Validators.required],
      type: ['cash', Validators.required],
      totalPay: [null],
      change: [null],
      status: [false, Validators.requiredTrue]
    });
    this.customerForm = this.fb.group({
      customer: [null, Validators.required]
    });
    this.orderForm = this.fb.group({
      shop: [null],
      type: [null],
      product: [null],
      quantity: [1,],
      price: [null],
      stock: [null],
      total: [null],
      orders: [null, [Validators.required, Validators.minLength(1)]]
    });
    this.titleService.setTitle('Toy Cafe & Wine - Order');
    this.retrieveCustomer();
    this.refreshShopList();
    this.paymentTypeChange();
    this.retrieveWallet();
  }

  retrieveWallet(): void {
    this.walletService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
     
      this.wallet=data[0];
      console.log('wallet', this.wallet);
    });
  }

  refreshShopList(): void {
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
      this.shops = data;
      if (this.shops) {
        this.orderForm.get("shop").setValue(this.shops[0]);
        this.retrieveProductType();
      }
    });
  }

  retrieveProductType(): void {
    let shop: Shop = this.orderForm.get("shop").value;
    this.productService.getProductType(shop).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.types = data;
      console.log(this.types);
      if (this.types) {
        this.orderForm.get("type").setValue(this.types[0]);
        this.refreshProductList();
      }

    });
  }

  refreshProductList(): void {
    this.retrieveProduct();
  }

  retrieveProduct(): void {
    let type: ProductType = this.orderForm.get("type").value;
    this.productService.getAllProductByType(type).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.procucts = data;
      if (this.procucts) {
        this.orderForm.get("product").setValue(this.procucts[0]);
        this.productChange();
      }
    });
  }

  refreshList(): void {
    this.retrieveCustomer();
  }

  retrieveCustomer(): void {
    this.customerService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('customers', data);
      this.customers = data;
      if (this.customers) {
        this.customerForm.get("customer").setValue(this.customers[0]);
      }

    });
  }

  customerChange() {
    console.log('customerChange', this.customerForm.value);
    if (this.customerForm.valid) {
      this.myStepper.next()
    }
  }

  shopChange() {
    console.log('shopChange', this.orderForm.get("shop").value);
    this.retrieveProductType();
  }

  typeChange() {
    console.log('typeChange', this.orderForm.get("type").value);
    this.retrieveProduct();
  }

  productChange() {
    let product: Product = this.orderForm.get("product").value;
    console.log('productChange', product);
    if (product) {
      this.orderForm.get("price").setValue(product.price);
      this.orderForm.get("stock").setValue(product.stock);
      this.quantityChange();
    } else {
      this.orderForm.get("price").setValue('');
      this.orderForm.get("stock").setValue('');
    }

  }

  quantityChange() {
    console.log('quantityChange', this.orderForm.get("quantity").value);
    let product: Product = this.orderForm.get("product").value;
    if (product) {
      let quantity = this.orderForm.get("quantity").value;
      if (quantity > product.stock) {
        quantity = product.stock;
        this.orderForm.get("quantity").setValue(product.stock);
      }
      this.orderForm.get("total").setValue(product.price * quantity);
    } else {
      this.orderForm.get("quantity").setValue(0);
      this.orderForm.get("total").setValue(0);
    }

  }

  getTotal() {
    let total = 0;
    for (let order of this.orders) {
      total = total + order.total;
    }
    return total;
  }

  deleteOrder(order: Order) {
    const startIndex = this.orders.indexOf(order);
    const deleteCount = 1;
    this.orders.splice(startIndex, deleteCount);
    this.orderForm.get("orders").setValue(this.orders);
    this.paymentForm.get("amount").setValue(this.getTotal());
  }

  addOrder() {
    let order = new Order();
    order.product = this.orderForm.get("product").value;
    order.productType = this.orderForm.get("type").value;
    order.quantity = this.orderForm.get("quantity").value;
    order.shop = this.orderForm.get("shop").value;
    order.total = this.orderForm.get("total").value;
    console.log('order', order);
    this.orders.push(order);
    this.orderForm.get("product").setValue(null);
    this.orderForm.get("orders").setValue(this.orders);
    this.paymentForm.get("amount").setValue(this.getTotal());
  }

  paymentTypeChange() {
    console.log(this.paymentForm.get("type").value);
    if (this.paymentForm.get("type").value == 'cash') {
      this.showCash = true;
      this.paymentForm.get("totalPay").setValidators(Validators.required);
      this.paymentForm.get("change").setValidators(Validators.required);
    } else {
      this.showCash = false;
      this.paymentForm.get("totalPay").clearValidators();
      this.paymentForm.get("change").clearValidators();
      this.paymentForm.get("change").reset();
      this.paymentForm.get("totalPay").reset();
      console.log('clear cash');
    }
  }

  totalPayChange() {
    let totalPay = this.paymentForm.get("totalPay").value;
    let amount = this.paymentForm.get("amount").value;
    let change = amount - totalPay;
    this.paymentForm.get("change").setValue(change);
  }

  createOrder() {
    let orderHistory = new OrderHistory();
    orderHistory.createBy = this.authService.getCurrentUser();
    orderHistory.createTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    orderHistory.orders = this.orders;
    orderHistory.updateBy = this.authService.getCurrentUser();
    orderHistory.updateTime = orderHistory.createTime
    orderHistory.payment = this.paymentForm.value;
    orderHistory.customer = this.customerForm.value;
    orderHistory.total = this.getTotal();
    console.log('orderHistory', orderHistory);


    this.orderService.create(orderHistory).then(() => {
      for (let order of orderHistory.orders) {
        let product: Product = order.product;
        let stock = { "stock": product.stock - order.quantity };
        this.productService.updateStock(product.key, stock);
      }
      this.wallet.balance = this.wallet.balance +orderHistory.total;
      if(orderHistory.payment.type=='cash'){ 
        this.wallet.cash = this.wallet.cash +orderHistory.total;
        this.wallet.drawer = this.wallet.drawer +orderHistory.total;
      }else{
        this.wallet.transfer = this.wallet.transfer +orderHistory.total;
      }
      this.walletService.update(this.wallet);
     
      this.goToDashboard();
    })
      .catch(err => console.log(err));

  }

  goToDashboard() {
    this.router.navigate(['/order/']);
  }

  checkStatus() {
    console.log(this.paymentForm);
  }
}
