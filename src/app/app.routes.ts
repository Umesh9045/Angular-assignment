import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { ProductsMasterComponent } from './module/products-master/products-master.component';
import { AddProductComponent } from './module/products-master/add-product/add-product.component';


export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductsMasterComponent,
    children: [
      // {
      //   path: '',
      //   component: ProductsMasterComponent
      // },
      {
        path: 'add-product',
        component: AddProductComponent
      }
    ]
  }
]
