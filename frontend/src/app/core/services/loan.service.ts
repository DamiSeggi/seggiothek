import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private http = inject(HttpClient);

  private url = 'http://localhost:9090/api/v1/loans';

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.url}/my-loans`);
  }

  create(bookId: number): Observable<Loan> {
    return this.http.post<Loan>(this.url, { bookId });
  }

  returnLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.url}/${id}/return`, {});
  }
}