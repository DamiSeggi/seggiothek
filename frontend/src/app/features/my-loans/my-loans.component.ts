import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { Router } from '@angular/router';
import { LoanService } from '../../core/services/loan.service';
import { BookService } from '../../core/services/book.service';
import { Loan } from '../../core/models/loan.model';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <h2>Meine Ausleihen</h2>
      <button (click)="goToBorrow()">+ Buch ausleihen</button>
    
      <div style="margin-top: 1rem;">
        @for (loan of loans; track loan) {
          <div class="card">
            <div>
              <div class="card-title">{{ getBookTitle(loan.bookId) }}</div>
              <span class="badge" [class.badge-active]="!loan.returned" [class.badge-returned]="loan.returned">
                {{ loan.returned ? 'Zurückgegeben' : 'Aktiv' }}
              </span>
            </div>
            <div class="card-actions">
              @if (!loan.returned) {
                <button class="btn-secondary" (click)="returnLoan(loan.id)">Zurückgeben</button>
              }
            </div>
          </div>
        }
      </div>
    </div>
    `
})
export class MyLoansComponent implements OnInit {
  private loanService = inject(LoanService);
  private bookService = inject(BookService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loans: Loan[] = [];
  books: Book[] = [];

  ngOnInit() {
    this.loanService.getMyLoans().subscribe({
      next: loans => {
        this.loans = loans.sort((a, b) => (a.returned === b.returned) ? 0 : a.returned ? 1 : -1);
        this.cdr.detectChanges();
      }
    });
    this.bookService.getAll().subscribe({
      next: books => { this.books = books; this.cdr.detectChanges(); }
    });
  }

  getBookTitle(bookId: number): string {
    return this.books.find(b => b.id === bookId)?.title ?? '...';
  }

  returnLoan(id: number) {
    this.loanService.returnLoan(id).subscribe(() => {
      this.loanService.getMyLoans().subscribe({
        next: loans => {
          this.loans = loans.sort((a, b) => (a.returned === b.returned) ? 0 : a.returned ? 1 : -1);
          this.cdr.detectChanges();
        }
      });
    });
  }

  goToBorrow() {
    this.router.navigate(['/books']);
  }
}