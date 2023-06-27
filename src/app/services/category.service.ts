import { Injectable } from '@angular/core';
import { BaseUrl } from '../model/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = BaseUrl.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + 'categorys');
  }

  getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl + 'categorys/'}${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl + 'categorys', category);
  }

  update(id: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.baseUrl + 'categorys/'}${id}`, category
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl + 'categorys/'}${id}`);
  }
}
