import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LoanService } from '../../core/services/loan.service';
import { BookService } from '../../core/services/book.service';
import { Loan } from '../../core/models/loan.model';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <h2>Meine Ausleihen</h2>

    <button (click)="goToBorrow()">Buch ausleihen</button>

    <div *ngFor="let loan of loans">
      <span>{{ getBookTitle(loan.bookId) }}</span>
      <span> – {{ loan.returned ? 'Zurückgegeben' : 'Aktiv' }}</span>
      <button *ngIf="!loan.returned" (click)="returnLoan(loan.id)">Zurückgeben</button>
    </div>
  `
})
export class MyLoansComponent implements OnInit {
  loans: Loan[] = [];
  books: Book[] = [];

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loanService.getMyLoans().subscribe({
      next: loans => { this.loans = loans; this.cdr.detectChanges(); }
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
        next: loans => { this.loans = loans; this.cdr.detectChanges(); }
      });
    });
  }

  goToBorrow() {
    this.router.navigate(['/books']);
  }
}