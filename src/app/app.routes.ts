import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { ProductsMasterComponent } from './module/products-master/products-master.component';
import { AddProductComponent } from './module/products-master/add-product/add-product.component';
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductsMasterComponent,
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: 'add-product',
    //     component: AddProductComponent,
    //     canActivate: [AuthGuard],
    //   }
    // ]
  },
  {
    path: '**',
    // component: DashboardComponent,
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
    // canActivate: [AuthGuard]
  }
];

