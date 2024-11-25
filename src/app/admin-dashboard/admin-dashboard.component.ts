import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  totalCategories: number = 0;
  totalSubCategories: number = 0;
  totalProducts: number = 0;
  totalStocks: number = 0;
  totalUsers: number = 0;

  constructor(
    private categoryService: CategoryService,

    private productService: ProductService,

    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: string | any[]) => {
        this.totalCategories = categories.length;
      });

    this.categoryService.getSubcategories().subscribe((subCategories) => {
      this.totalSubCategories = subCategories.length;
    });

    this.productService.getProducts().subscribe((products) => {
      this.totalProducts = products.length;
    });

    this.productService.getProducts().subscribe((stocks) => {
      this.totalStocks = stocks.length;
    });

    this.userService.getUsers().subscribe((users) => {
      this.totalUsers = users.length;
    });
  }
}
