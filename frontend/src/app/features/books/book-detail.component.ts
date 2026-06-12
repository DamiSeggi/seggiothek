import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CategoryService } from '../../core/services/category.service';
import { LoanService } from '../../core/services/loan.service';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <button class="btn-back" (click)="goBack()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      @if (book) {
        <div class="detail-wrapper">
          <h2>{{ book.title }}</h2>
          <div class="detail-card">
            <div class="detail-row">
              <span class="card-sub">Autor</span>
              <div class="card-title">{{ book.author }}</div>
            </div>
            <div class="detail-row">
              <span class="card-sub">Kategorie</span>
              <div class="card-title">{{ categoryName }}</div>
            </div>
            <div class="detail-row">
              <span class="card-sub">Status</span>
              @if (book.available) {
                <span class="badge badge-active">Verfügbar</span>
              } @else {
                <span class="badge badge-unavailable">Ausgeliehen</span>
              }
            </div>
          </div>
          @if (book.available) {
            <button class="detail-borrow-btn" (click)="borrow(book.id)">Ausleihen</button>
          }
        </div>
      }
    </div>
  `
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private categoryService = inject(CategoryService);
  private loanService = inject(LoanService);
  private cdr = inject(ChangeDetectorRef);

  book: Book | null = null;
  categoryName = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getById(id).subscribe({
      next: book => {
        this.book = book;
        if (book.categoryId) {
          this.categoryService.getById(book.categoryId).subscribe({
            next: cat => { this.categoryName = cat.name; this.cdr.detectChanges(); }
          });
        }
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
    window.history.back();
  }

}