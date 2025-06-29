import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customer/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/expense',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expense',
    loadChildren: () => import('./features/expense/expense.module').then(m => m.ExpenseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadChildren: () => import('./features/stock/stock.module').then(m => m.StockModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'table',
    loadChildren: () => import('./features/table/table.module').then(m => m.TableModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rent',
    loadChildren: () => import('./features/rent/rent.module').then(m => m.RentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lots',
    loadChildren: () => import('./features/lots/lots.module').then(m => m.LotsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./features/report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', 
    redirectTo: '/accounts/accounts-daily',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
