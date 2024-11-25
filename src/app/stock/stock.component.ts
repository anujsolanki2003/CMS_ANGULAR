import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { EditStockDialogComponent } from './edit-stock-dialog/edit-stock-dialog.component';

import { AddStockComponent } from './add-stock/add-stock.component';
import { StockConfirmationDialogComponent } from './stock-confirmation-dialog/stock-confirmation-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  productId!: number;
  stockData: any[] = [];
  productName: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.productId = +idParam; // Convert to number
      this.getStockData();
    } else {
      console.error('Product ID is missing or invalid.');
    }
  }

  getStockData(): void {
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        this.productName = data.productName;
        this.stockData = data.stock || [];
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  openEditDialog(stockItem: any): void {
    const dialogRef = this.dialog.open(EditStockDialogComponent, {
      width: '300px',
      data: { ...stockItem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService
          .updateStock(this.productId, stockItem.id, result)
          .subscribe(
            () => {
              this.getStockData();
            },
            (error) => {
              console.error('Error updating stock:', error);
            }
          );
      }
    });
  }

  openAddStockDialog(): void {
    const dialogRef = this.dialog.open(AddStockComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.addStock(this.productId, result).subscribe(
          () => {
            this.getStockData(); // Refresh stock data after adding
          },
          (error) => {
            console.error('Error adding stock:', error);
          }
        );
      }
    });
  }

  deleteStock(stockId: number): void {
    const dialogRef = this.dialog.open(StockConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this stock?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productService.deleteStock(this.productId, stockId).subscribe(
          () => {
            this.getStockData();
          },
          (error) => {
            console.error('Error deleting stock:', error);
          }
        );
      }
    });
  }
}
