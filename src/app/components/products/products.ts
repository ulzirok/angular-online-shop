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

@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButton, CommonModule, RouterLink, MatToolbarModule, MatDialogModule, MatButtonModule, DialogBox],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  products: IProducts[]
  productsSubscription: Subscription
  canEdit: boolean = false
  
  constructor(private productsService: ProductsService, public dialog: MatDialog) {  }
  
  ngOnInit(): void {
    this.canEdit = true
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => {
      this.products = data
    })
  }
  
  openDialog(): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true
    dialogConfig.data = this.products
    
    const dialogRef = this.dialog.open(DialogBox, dialogConfig);
    
    dialogRef.afterClosed().subscribe((data) => 
      this.postData(data)
    )
  }
  
  postData(data: IProducts) {
    console.log(data);
    
    this.productsService.postProduct(data).subscribe((data) => this.products.push(data))
  }
  
  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
  }
}
