import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { CategoryService } from '../../core/services/category.service';
import { Book } from '../../core/models/book.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="page">
      <h2>Bücher verwalten</h2>
      <button (click)="openModal()">Neues Buch</button>

      <div style="margin-top: 1rem;">
        <div class="card" *ngFor="let book of books">
          <div>
            <div class="card-title">{{ book.title }}</div>
            <div class="card-sub">{{ book.author }} · {{ getCategoryName(book.categoryId) }}</div>
          </div>
          <div class="card-actions">
            <button class="btn-secondary" (click)="openModal(book)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="btn-danger" (click)="delete(book.id)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal">
          <h3>{{ editId ? 'Buch bearbeiten' : 'Neues Buch' }}</h3>
          <input [(ngModel)]="form.title" placeholder="Titel" />
          <input [(ngModel)]="form.author" placeholder="Autor" />
          <select [(ngModel)]="form.categoryId">
            <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
          </select>
          <div class="modal-actions">
            <button (click)="save()">Speichern</button>
            <button class="btn-secondary" (click)="closeModal()">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminBooksComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  showModal = false;
  editId: number | null = null;
  form = { title: '', author: '', categoryId: 0 };

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
    this.categoryService.getAll().subscribe({
      next: cats => { this.categories = cats; this.cdr.detectChanges(); }
    });
  }

  load() {
    this.bookService.getAll().subscribe({
      next: books => { this.books = books; this.cdr.detectChanges(); }
    });
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name ?? '...';
  }

  openModal(book?: Book) {
    if (book) {
      this.editId = book.id;
      this.form = { title: book.title, author: book.author, categoryId: book.categoryId };
    } else {
      this.editId = null;
      this.form = { title: '', author: '', categoryId: 0 };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.editId) {
      this.bookService.update(this.editId, this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    } else {
      this.bookService.create(this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    }
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe(() => this.load());
  }
}