import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [FormsModule, ConfirmDialogComponent],
  template: `
    <div class="page">
      <h2>Kategorien verwalten</h2>
      <button (click)="openModal()">Neue Kategorie</button>

      <div style="margin-top: 1rem;">
        @for (cat of categories; track cat) {
          <div class="card">
            <div class="card-title">{{ cat.name }}</div>
            <div class="card-actions">
              <button class="btn-secondary" (click)="openModal(cat)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="btn-danger" (click)="delete(cat.id)">
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
        }
      </div>

      @if (showModal) {
        <div class="modal-overlay">
          <div class="modal">
            <h3>{{ editId ? 'Kategorie bearbeiten' : 'Neue Kategorie' }}</h3>
            <input [(ngModel)]="form.name" placeholder="Name" maxlength="50" />
            @if (errors.name) {
              <small style="color: #c62828;">{{ errors.name }}</small>
            }
            <input [(ngModel)]="form.description" placeholder="Beschreibung" maxlength="200" />
            @if (errors.description) {
              <small style="color: #c62828;">{{ errors.description }}</small>
            }
            <div class="modal-actions">
              <button (click)="save()">Speichern</button>
              <button class="btn-secondary" (click)="closeModal()">Abbrechen</button>
            </div>
          </div>
        </div>
      }

      @if (showConfirm) {
        <app-confirm-dialog
          title="Kategorie löschen"
          message="Möchtest du diese Kategorie wirklich löschen?"
          (confirmed)="confirmDelete()"
          (cancelled)="showConfirm = false" />
      }
    </div>
  `
})
export class AdminCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];
  showModal = false;
  showConfirm = false;
  deleteId: number | null = null;
  editId: number | null = null;
  form = { name: '', description: '' };
  errors = { name: '', description: '' };

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
    this.errors = { name: '', description: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  validate(): boolean {
    this.errors = { name: '', description: '' };
    let valid = true;

    if (!this.form.name.trim()) {
      this.errors.name = 'Name ist erforderlich.';
      valid = false;
    } else if (this.form.name.length < 2) {
      this.errors.name = 'Name muss mindestens 2 Zeichen lang sein.';
      valid = false;
    }

    if (!this.form.description.trim()) {
      this.errors.description = 'Beschreibung ist erforderlich.';
      valid = false;
    }

    return valid;
  }

  save() {
    if (!this.validate()) return;
    const action = this.editId
      ? this.categoryService.update(this.editId, this.form)
      : this.categoryService.create(this.form);
    action.subscribe(() => { this.load(); this.closeModal(); });
  }

  delete(id: number) {
    this.deleteId = id;
    this.showConfirm = true;
  }

  confirmDelete() {
    if (this.deleteId) {
      this.categoryService.delete(this.deleteId).subscribe(() => {
        this.load();
        this.showConfirm = false;
      });
    }
  }
}