import { Routes } from '@angular/router';
import { Base } from './components/base/base';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { Basket } from './components/basket/basket';
import { ProductsResolver } from './services/products-resolver';

export const routes: Routes = [
  {path: '', component: Base},
  {path: 'products', component: Products},
  {path: 'product/:id', component: ProductDetails, resolve: {data: ProductsResolver}},
  {path: 'basket', component: Basket},
  {path: "**", redirectTo: "", component: Base, pathMatch: 'full'},
];
