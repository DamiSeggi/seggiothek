import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { BooksComponent } from './books.component';
import { CategoryService } from '../../core/services/category.service';
import { Router } from '@angular/router';

const mockCategories = [
  { id: 1, name: 'Roman', description: 'Romane aller Art' },
  { id: 2, name: 'Krimi', description: 'Spannung' },
];

describe('BooksComponent', () => {
  it('zeigt Kategorien an', async () => {
    await render(BooksComponent, {
      providers: [
        { provide: CategoryService, useValue: { getAll: () => of(mockCategories) } },
        { provide: Router, useValue: { navigate: vi.fn() } },
      ],
    });

    expect(screen.getByText('Roman')).toBeInTheDocument();
    expect(screen.getByText('Romane aller Art')).toBeInTheDocument();
    expect(screen.getByText('Krimi')).toBeInTheDocument();
  });

  it('navigiert bei Klick auf Kategorie', async () => {
    const navigateSpy = vi.fn();

    await render(BooksComponent, {
      providers: [
        { provide: CategoryService, useValue: { getAll: () => of(mockCategories) } },
        { provide: Router, useValue: { navigate: navigateSpy } },
      ],
    });

    await userEvent.click(screen.getByText('Roman'));
    expect(navigateSpy).toHaveBeenCalledWith(['/books/category', 1]);
  });
});