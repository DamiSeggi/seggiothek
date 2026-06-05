import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private url = 'http://localhost:9090/api/v1/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`);
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }

  update(id: number, book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${id}`, book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}