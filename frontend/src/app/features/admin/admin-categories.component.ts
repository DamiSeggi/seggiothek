import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="page">
      <h2>Kategorien verwalten</h2>
      <button (click)="openModal()">Neue Kategorie</button>

      <div style="margin-top: 1rem;">
        <div class="card" *ngFor="let cat of categories">
          <div class="card-title">{{ cat.name }}</div>
          <div class="card-actions">
            <button class="btn-secondary" (click)="openModal(cat)">✏️</button>
            <button class="btn-danger" (click)="delete(cat.id)">🗑️</button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="showModal">
        <div class="modal">
          <h3>{{ editId ? 'Kategorie bearbeiten' : 'Neue Kategorie' }}</h3>
          <input [(ngModel)]="form.name" placeholder="Name" />
          <input [(ngModel)]="form.description" placeholder="Beschreibung" />
          <div class="modal-actions">
            <button (click)="save()">Speichern</button>
            <button class="btn-secondary" (click)="closeModal()">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  showModal = false;
  editId: number | null = null;
  form = { name: '', description: '' };

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe({
      next: cats => { this.categories = cats; this.cdr.detectChanges(); }
    });
  }

  openModal(cat?: Category) {
    if (cat) {
      this.editId = cat.id;
      this.form = { name: cat.name, description: cat.description };
    } else {
      this.editId = null;
      this.form = { name: '', description: '' };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.editId) {
      this.categoryService.update(this.editId, this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    } else {
      this.categoryService.create(this.form).subscribe(() => {
        this.load();
        this.closeModal();
      });
    }
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => this.load());
  }
}