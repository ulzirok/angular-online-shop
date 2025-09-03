import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsService } from './products-service';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<IProducts> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    const id = Number(route.params['id']);
    return this.productsService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products'])
        return EMPTY
      })
    )
  }
}