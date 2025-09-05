import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DialogBox } from '../dialog-box/dialog-box';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButton, CommonModule, RouterLink, MatToolbarModule, MatDialogModule, MatButtonModule, MatMenuModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  
  constructor(private productsService: ProductsService, public dialog: MatDialog) { }
  
  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;
  
  canEdit: boolean = false
  
  ngOnInit(): void {
    this.canEdit = true
    
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data
    })
    
    this.basketSubscription = this.productsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }
  
  addToBasket(product: IProducts) {
    product.quantity = 1
    let findItem
    
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) this.updateBasket(findItem)
      else this.postToBasket(product)
    }
    else {
      this.postToBasket(product)
    }
  }
  
  postToBasket(product: IProducts) {
    this.productsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    )
  }
  
  updateBasket(product: IProducts) {
    product.quantity += 1
    this.productsService.updateProductBasket(product).subscribe((data) => {
      
    })
  }
  
  deleteItem(id: number) {
    console.log(id);
    this.productsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (item.id === id) {
        let index = this.products.findIndex((data) => data.id === id)
        this.products.splice(index, 1)
      }
    })
    )
    
  }
  
  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true
    dialogConfig.data = product
    dialogConfig.data = this.products
    
    const dialogRef = this.dialog.open(DialogBox, dialogConfig);
    
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.id) 
        this.updateData(data)
      else
        this.postData(data)
      
    }
      
    )
  }
  
  postData(data: IProducts) {
    console.log(data);
    this.productsService.postProduct(data).subscribe((data) => this.products.push(data))
  }
  
  updateData(product: IProducts) {
    this.productsService.updateProduct(product).subscribe((data) => {
      
    })
  }
  
  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
