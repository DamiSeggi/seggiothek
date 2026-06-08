import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CategoryService } from '../../core/services/category.service';
import { LoanService } from '../../core/services/loan.service';
import { Book } from '../../core/models/book.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="page">
<button class="btn-back" (click)="goBack()">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1565c0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
</button>      <h2 style="margin-top: 1rem;">{{ category?.name }}</h2>

      <div class="card" *ngFor="let book of books">
        <div>
          <div class="card-title">{{ book.title }}</div>
          <div class="card-sub">{{ book.author }}</div>
        </div>
        <div class="card-actions">
          <button *ngIf="book.available" (click)="borrow(book.id)">Ausleihen</button>
          <span *ngIf="!book.available" class="badge badge-unavailable">Ausgeliehen</span>
        </div>
      </div>
    </div>
  `
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private loanService: LoanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getById(id).subscribe({
      next: cat => { this.category = cat; this.cdr.detectChanges(); }
    });
    this.bookService.getAll().subscribe({
      next: books => {
        this.books = books.filter(b => b.categoryId === id);
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
}