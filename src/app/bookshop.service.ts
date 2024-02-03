import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, Category, Book, CategoryRequest, AuthorRequest } from './bookshop';

@Injectable({
  providedIn: 'root'
})
export class BookshopService {
  private BASE_URL = 'http://localhost:8091';

  constructor(private http: HttpClient) { }

  //Categories
  getAllCategories() {
    return this.http.get<Category[]>(`${this.BASE_URL}/api/v1/category`);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.BASE_URL}/api/v1/category/${id}`);
  }

  createCategory(categoryRequest: CategoryRequest) {
    return this.http.post<Category>(`${this.BASE_URL}/api/v1/category`, categoryRequest); 
  }

  updateCategory(id: number, categoryRequest: CategoryRequest) {
    return this.http.put<Category>(`${this.BASE_URL}/api/v1/category/${id}`, categoryRequest); 
  }

  deleteCategory(id: number){
    return this.http.delete<any>(`${this.BASE_URL}/api/v1/category/${id}`);
  }
  
  //Authors
  getAllAuthors() {
    return this.http.get<Author[]>(`${this.BASE_URL}/api/v1/author`);
  }

  getAuthorById(id: number) {
    return this.http.get<Author>(`${this.BASE_URL}/api/v1/author/${id}`);
  }

  createAuthor(authorRequest: AuthorRequest) {
    return this.http.post<Author>(`${this.BASE_URL}/api/v1/author`, authorRequest); 
  }

  updateAuthor(id: number, authorRequest: AuthorRequest) {
    return this.http.put<Author>(`${this.BASE_URL}/api/v1/author/${id}`, authorRequest); 
  }

  deleteAuthor(id: number){
    return this.http.delete<any>(`${this.BASE_URL}/api/v1/author/${id}`);
  }

  //Books
  getAllBooks() {
    return this.http.get<Book[]>(`${this.BASE_URL}/api/v1/book`);
  }

  geBookById(id: number) {
    return this.http.get(`${this.BASE_URL}/api/v1/book/${id}`);
  }

}