import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteDialogComponent } from './delete-dailog/delete-dailog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { SubcategoryDialogComponent } from './categories/subcategory-dailog/subcategory-dailog.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ConfirmationDialogComponent } from './products/confirmation-dialog/confirmation-dialog.component';
import { StockComponent } from './stock/stock.component';
import { EditStockDialogComponent } from './stock/edit-stock-dialog/edit-stock-dialog.component';
import { StockConfirmationDialogComponent } from './stock/stock-confirmation-dialog/stock-confirmation-dialog.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UsersProductComponent } from './users-product/users-product.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    LoginComponent,
    NavbarComponent,
    UserDialogComponent,
    DeleteDialogComponent,
    CategoryDialogComponent,
    SubcategoryDialogComponent,
    ProductDialogComponent,
    ConfirmationDialogComponent,
    StockComponent,
    EditStockDialogComponent,
    StockConfirmationDialogComponent,
    AddStockComponent,
    CartComponent,
    WishlistComponent,
    UsersProductComponent,
    DeleteUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
