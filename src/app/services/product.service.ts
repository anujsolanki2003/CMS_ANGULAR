import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = this.getToken();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headers);
  }

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single product by ID
  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.get<any>(url);
  }

  // Add a new product
  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData, {
      headers: this.getHeaders(true),
    });
  }

  //Update an existing product
  updateProduct(id: any, productData: FormData): Observable<any> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.put<any>(url, productData, {
      headers: this.getHeaders(true),
    });
  }
  // updateProduct(id: any, productData: any): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put<any>(url, productData, {
  //     headers: this.getHeaders(),
  //   });
  // }

  // Delete a product
  deleteProduct(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  // Add stock data for a product
  addStock(productId: any, stockData: any): Observable<any> {
    const url = `${this.apiUrl}/stock/${productId}`;
    return this.http.post<any>(url, stockData, { headers: this.getHeaders() });
  }

  // Update stock data for a product
  updateStock(
    productId: number,
    stockId: number,
    stockData: any
  ): Observable<any> {
    const url = `${this.apiUrl}/stock/${productId}/${stockId}`;
    return this.http.put<any>(url, stockData, { headers: this.getHeaders() });
  }

  // Delete a specific stock item using productId and stockId
  deleteStock(productId: number, stockId: number): Observable<any> {
    const url = `${this.apiUrl}/stock/${productId}/${stockId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
