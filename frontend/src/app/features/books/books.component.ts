import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>Kategorien</h2>

    <div *ngFor="let category of categories" (click)="goToCategory(category.id)" style="cursor:pointer; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
      <strong>{{ category.name }}</strong>
      <p>{{ category.description }}</p>
    </div>
  `
})
export class BooksComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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