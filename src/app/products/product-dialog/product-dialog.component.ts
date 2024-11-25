import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];
  productForm!: FormGroup;
  selectedFile: File | null = null;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: any,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.loadProductForm();
    this.loadCategories();
  }

  ngOnInit(): void {
    this.loadProductForm();
    if (this.productData) {
      this.isEditing = true;
      this.bindProductData();
      this.loadSubcategories(this.productData.categoryId);
    }
  }

  bindProductData() {
    this.productForm.patchValue({
      productName: this.productData.productName || '',
      model: this.productData.model || '',
      description: this.productData.description || '',
      categoryId: this.productData.categoryId || null,
      subcategoryId: this.productData.subcategoryId || null,
      stock: {
        size: this.productData.size || '',
        price: this.productData.price || 0,
        color: this.productData.color || '',
        totalQuantity: this.productData.totalQuantity || 0,
      },
    });
  }

  loadProductForm() {
    this.productForm = this.fb.group({
      productName: null,
      model: null,
      description: null,
      categoryId: null,
      subcategoryId: null,
      stock: this.fb.group({
        size: null,
        price: null,
        color: null,
        totalQuantity: null,
      }),
    });

    this.productForm.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      if (categoryId) {
        this.loadSubcategories(categoryId);
      } else {
        this.subcategories = [];
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadSubcategories(categoryId: number) {
    this.categoryService
      .getSubcategoriesByCategoryId(categoryId)
      .subscribe((data) => {
        this.subcategories = data;
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  // Submit Product Data
  submitProductData() {
    const formData = this.prepareFormData();

    if (this.isEditing) {
      this.productService
        .updateProduct(this.productData.id, formData)
        .subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
    } else {
      this.productService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
  private prepareFormData(): FormData {
    const formData = new FormData();

    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append('model', this.productForm.get('model')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('categoryId', this.productForm.get('categoryId')?.value);
    formData.append(
      'subcategoryId',
      this.productForm.get('subcategoryId')?.value
    );

    const stock = this.productForm.get('stock')?.value;
    if (stock) {
      formData.append('size', stock.size);
      formData.append('price', stock.price);
      formData.append('color', stock.color);
      formData.append('totalQuantity', stock.totalQuantity);
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    return formData;
  }
}
