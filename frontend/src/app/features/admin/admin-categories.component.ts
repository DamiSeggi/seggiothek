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
    <h2>Kategorien verwalten</h2>

    <button (click)="openModal()">Neue Kategorie</button>

    <div *ngFor="let cat of categories" style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
      <span>{{ cat.name }}</span>
      <button (click)="openModal(cat)">✏️</button>
      <button (click)="delete(cat.id)">🗑️</button>
    </div>

    <div *ngIf="showModal" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;">
      <div style="background:#fff; padding:1rem; width:300px;">
        <h3>{{ editId ? 'Kategorie bearbeiten' : 'Neue Kategorie' }}</h3>
        <input [(ngModel)]="form.name" placeholder="Name" style="display:block; width:100%; margin-bottom:0.5rem;" />
        <input [(ngModel)]="form.description" placeholder="Beschreibung" style="display:block; width:100%; margin-bottom:0.5rem;" />
        <button (click)="save()">Speichern</button>
        <button (click)="closeModal()">Abbrechen</button>
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