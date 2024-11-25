import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'model',
    'description',
    'category',
    'subcategory',
    'addedBy',
    'image',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        const productsWithAbsoluteUrls = data.map((product) => {
          const fullImageUrl = product.image
            ? `http://localhost:3000${product.image}`
            : null;
          return {
            ...product,
            image: fullImageUrl,
          };
        });
        this.dataSource.data = productsWithAbsoluteUrls;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    );
  }

  openDialog(product: any = null): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = this.prepareProductData(result);

        if (
          !result.productName ||
          !result.model ||
          !result.description ||
          !result.categoryId ||
          !result.subcategoryId
        ) {
          console.error('Missing required fields in product:', result);
          return;
        }

        this.productService.updateProduct(product.id, formData).subscribe(
          (updatedProduct) => {
            const index = this.dataSource.data.findIndex(
              (p) => p.id === product.id
            );
            if (index !== -1) {
              this.dataSource.data[index] = updatedProduct;
              this.dataSource._updateChangeSubscription();
            }
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

  prepareProductData(product: any): FormData {
    const formData = new FormData();

    formData.append('productName', product.productName || '');
    formData.append('model', product.model || '');
    formData.append('description', product.description || '');
    formData.append('categoryId', (product.categoryId || '').toString());
    formData.append('subcategoryId', (product.subcategoryId || '').toString());

    if (product.size) {
      formData.append('size', product.size);
    }
    if (product.price) {
      formData.append('price', product.price.toString());
    }
    if (product.color) {
      formData.append('color', product.color);
    }
    if (product.totalQuantity) {
      formData.append('totalQuantity', product.totalQuantity.toString());
    }

    return formData;
  }

  confirmDeleteProduct(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this product?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (product) => product.id !== id
      );
      this.dataSource._updateChangeSubscription();
    });
  }

  viewStock(productId: number): void {
    this.router.navigate(['/stock', productId]);
  }
}
