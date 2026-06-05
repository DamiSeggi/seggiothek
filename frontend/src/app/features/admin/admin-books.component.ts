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
    <h2>Bücher verwalten</h2>

    <button (click)="openModal()">Neues Buch</button>

    <div *ngFor="let book of books" style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
      <span>{{ book.title }} – {{ book.author }} ({{ getCategoryName(book.categoryId) }})</span>
      <button (click)="openModal(book)">✏️</button>
      <button (click)="delete(book.id)">🗑️</button>
    </div>

    <div *ngIf="showModal" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;">
      <div style="background:#fff; padding:1rem; width:300px;">
        <h3>{{ editId ? 'Buch bearbeiten' : 'Neues Buch' }}</h3>
        <input [(ngModel)]="form.title" placeholder="Titel" style="display:block; width:100%; margin-bottom:0.5rem;" />
        <input [(ngModel)]="form.author" placeholder="Autor" style="display:block; width:100%; margin-bottom:0.5rem;" />
        <select [(ngModel)]="form.categoryId" style="display:block; width:100%; margin-bottom:0.5rem;">
          <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
        </select>
        <button (click)="save()">Speichern</button>
        <button (click)="closeModal()">Abbrechen</button>
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