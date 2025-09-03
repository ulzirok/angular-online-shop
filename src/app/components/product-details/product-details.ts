import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButton, CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  product: IProducts;
  productSubscription: Subscription
  constructor(private route: ActivatedRoute) {
    
  }
  
  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data']
    })
  }
}
