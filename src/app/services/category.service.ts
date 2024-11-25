import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';

  // Get subcategories by categoryId
  getSubcategoriesByCategoryId(categoryId: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.apiUrl}/subcategories?categoryId=${categoryId}`,
      this.getHeaders()
    );
  }

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Add a new category
  addCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, categoryData, this.getHeaders());
  }

  getSubcategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategories`);
  }

  // Add a new subcategory
  addSubcategory(subcategoryData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/subcategories`,
      subcategoryData,
      this.getHeaders()
    );
  }

  // Update a subcategory
  updateSubcategory(
    subcategoryId: number,
    subcategoryData: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/subcategories/${subcategoryId}`,
      subcategoryData,
      this.getHeaders()
    );
  }

  // Delete a subcategory by ID
  deleteSubcategory(subcategoryId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/subcategories/${subcategoryId}`,
      this.getHeaders()
    );
  }

  // Delete a category by ID
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`, this.getHeaders());
  }

  // update a category by ID
  updateCategory(categoryId: number, result: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${categoryId}`,
      result,
      this.getHeaders()
    );
  }
}
