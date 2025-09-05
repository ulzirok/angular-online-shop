import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products-service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [MatCardModule, MatButton, CommonModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})
export class Basket implements OnInit {
  constructor(private ProductsService: ProductsService) {}
  basket: IProducts[]
  basketSubscription: Subscription
  
  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }
  
  ngOnDestroy(): void {
    if(this.basketSubscription) this.basketSubscription.unsubscribe()
  }
  
  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let index = this.basket.findIndex((data) => data.id === item.id)
        this.basket.splice(index, 1)
      })
    }
    else {
      item.quantity -= 1;
      this.ProductsService.updateProductBasket(item).subscribe((data) => {

      })
    }
  }
  
  plusItemToBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductsService.updateProductBasket(item).subscribe((data) => {

    })
  }
}
