import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/my-loans/my-loans.component').then(m => m.MyLoansComponent)
  },
  {
    path: 'books',
    loadComponent: () => import('./features/books/books.component').then(m => m.BooksComponent)
  },
  {
    path: 'books/category/:id',
    loadComponent: () => import('./features/books/book-list.component').then(m => m.BookListComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./features/books/book-detail.component').then(m => m.BookDetailComponent)
  },
  {
    path: 'admin/categories',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-categories.component').then(m => m.AdminCategoriesComponent)
  },
  {
    path: 'admin/books',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-books.component').then(m => m.AdminBooksComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];