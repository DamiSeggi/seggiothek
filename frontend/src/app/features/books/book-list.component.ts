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
    <button (click)="goBack()">← Zurück</button>
    <h2>{{ category?.name }}</h2>

    <div *ngFor="let book of books" style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
      <strong>{{ book.title }}</strong> – {{ book.author }}
      <button *ngIf="book.available" (click)="borrow(book.id)">Ausleihen</button>
      <span *ngIf="!book.available">Ausgeliehen</span>
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