import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { DeleteDialogComponent } from '../delete-dailog/delete-dailog.component';
import { SubcategoryDialogComponent } from './subcategory-dailog/subcategory-dailog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
  }

  // Load all categories
  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Load all subcategories
  loadSubcategories() {
    this.categoryService.getSubcategories().subscribe((data) => {
      console.log(data); // Check the structure here
      this.subcategories = data;
    });
  }

  // Open Add Category Dialog
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.addCategory(result).subscribe(() => {
          this.loadCategories();
        });
      }
    });
  }

  // Open Add Subcategory Dialog
  openAddSubcategoryDialog(): void {
    const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
      width: '300px',
      data: { categories: this.categories }, // Pass categories to dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.addSubcategory(result).subscribe(() => {
          this.loadSubcategories();
        });
      }
    });
  }

  // Edit Category
  editCategory(category: any): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '300px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .updateCategory(category.id, result)
          .subscribe(() => {
            this.loadCategories();
          });
      }
    });
  }

  // Edit Subcategory
  editSubcategory(subcategory: any): void {
    const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
      width: '300px',
      data: subcategory,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .updateSubcategory(subcategory.id, result)
          .subscribe(() => {
            this.loadSubcategories();
          });
      }
    });
  }

  // Delete category
  deleteCategory(categoryId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this category?',
        confirmButtonText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.loadCategories();
        });
      }
    });
  }

  // Delete subcategory
  // deleteSubcategory(subcategoryId: number) {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '300px',
  //     data: {
  //       title: 'Confirm Delete',
  //       message: 'Are you sure you want to delete this subcategory?',
  //       confirmButtonText: 'Delete',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.categoryService.deleteSubcategory(subcategoryId).subscribe(() => {
  //         this.loadSubcategories();
  //       });
  //     }
  //   });
  // }
  // Delete subcategory
  deleteSubcategory(subcategory: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the subcategory "${subcategory.name}"?`,
        confirmButtonText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteSubcategory(subcategory.id).subscribe(() => {
          this.loadSubcategories();
        });
      }
    });
  }
}
