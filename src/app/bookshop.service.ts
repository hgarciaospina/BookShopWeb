import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, Category, Book } from './bookshop';

@Injectable({
  providedIn: 'root'
})
export class BookshopService {

  private BASE_URL = 'http://localhost:8091';

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Category[]>(`${this.BASE_URL}/api/v1/category`);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.BASE_URL}/api/v1/category/${id}`);
  }
  
  getAllAuthors() {
    return this.http.get<Author[]>(`${this.BASE_URL}/api/v1/author`);
  }

  getAuthorById(id: number) {
    return this.http.get<Author>(`${this.BASE_URL}/api/v1/author/${id}`);
  }

  getAllBooks() {
    return this.http.get<Book[]>(`${this.BASE_URL}/api/v1/book`);
  }

  geBookById(id: number) {
    return this.http.get(`${this.BASE_URL}/api/v1/book/${id}`);
  }

}