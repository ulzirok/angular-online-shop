import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButton, CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products: IProducts[]
  
  productsSubscription: Subscription
  
  constructor(private productsService: ProductsService) {
    
  }
  
  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data
    })
  }
  
  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
  }
}
