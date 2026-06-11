import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button class="btn-danger" (click)="confirmed.emit()">Löschen</button>
          <button class="btn-secondary" (click)="cancelled.emit()">Abbrechen</button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() title = 'Bestätigen';
  @Input() message = 'Möchtest du diesen Eintrag wirklich löschen?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}