import { describe, it, expect, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll() macht GET auf /books', () => {
    const mockBooks = [{ id: 1, title: 'Test', author: 'Max' }];
    service.getAll().subscribe(books => expect(books).toEqual(mockBooks));
    httpMock.expectOne('http://localhost:9090/api/v1/books').flush(mockBooks);
  });

  it('getById() macht GET auf /books/1', () => {
    const mockBook = { id: 1, title: 'Test', author: 'Max' };
    service.getById(1).subscribe(book => expect(book).toEqual(mockBook));
    httpMock.expectOne('http://localhost:9090/api/v1/books/1').flush(mockBook);
  });

  it('delete() macht DELETE auf /books/1', () => {
    service.delete(1).subscribe();
    httpMock.expectOne('http://localhost:9090/api/v1/books/1').flush(null);
  });
});