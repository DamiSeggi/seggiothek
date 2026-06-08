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
            <button class="btn-secondary" (click)="openModal(book)">✏️</button>
            <button class="btn-danger" (click)="delete(book.id)">🗑️</button>
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