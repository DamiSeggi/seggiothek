import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CategoryService } from '../../core/services/category.service';
import { LoanService } from '../../core/services/loan.service';
import { Book } from '../../core/models/book.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <button class="btn-back" (click)="goBack()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        </button>      <h2 style="margin-top: 1rem;">{{ category?.name }}</h2>
    
        @for (book of books; track book) {
          <div class="card" 
              (click)="goToDetail(book.id)"
              (keyup.enter)="goToDetail(book.id)"
              tabindex="0"
              role="button">
            <div>
              <div class="card-title">{{ book.title }}</div>
              <div class="card-sub">{{ book.author }}</div>
            </div>
            <div class="card-actions">
              @if (book.available) {
                <button (click)="borrow(book.id)">Ausleihen</button>
              }
              @if (!book.available) {
                <span class="badge badge-unavailable">Ausgeliehen</span>
              }
            </div>
          </div>
        }
      </div>
    `
})
export class BookListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private categoryService = inject(CategoryService);
  private loanService = inject(LoanService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  category: Category | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getById(id).subscribe({
      next: cat => { this.category = cat; this.cdr.detectChanges(); }
    });
    this.bookService.getAll().subscribe({
      next: books => {
        this.books = books
          .filter(b => b.categoryId === id)
          .sort((a, b) => (a.available === b.available) ? 0 : a.available ? -1 : 1);
        this.cdr.detectChanges();
      }
    });
  }

  borrow(bookId: number) {
    this.loanService.create(bookId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  goBack() {
    this.router.navigate(['/books']);
  }

  goToDetail(id: number) {
  this.router.navigate(['/books', id]);
}
}