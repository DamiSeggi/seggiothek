import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  template: `
    <div class="page">
      <h2>Kategorien</h2>
      @for (category of categories; track category) {
        <div class="card category-card" 
            (click)="goToCategory(category.id)"
            (keyup.enter)="goToCategory(category.id)"
            tabindex="0"
            role="button">
          <div>
            <div class="card-title">{{ category.name }}</div>
            <div class="card-sub">{{ category.description }}</div>
          </div>
          <span>›</span>
        </div>
      }
    </div>
    `,
  styles: [`
    .category-card { cursor: pointer; }
  `]
})
export class BooksComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: cats => {
        this.categories = cats;
        this.cdr.detectChanges();
      },
      error: err => console.error('error', err)
    });
  }

  goToCategory(id: number) {
    this.router.navigate(['/books/category', id]);
  }
}