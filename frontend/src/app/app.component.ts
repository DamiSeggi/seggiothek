import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from './core/services/user.service';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <main class="main-content">
      <router-outlet />
    </main>

  <nav class="bottom-nav">
    <div class="nav-spacer"></div>
    <div class="nav-links">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Meine Ausleihen</a>
      <a routerLink="/books" routerLinkActive="active">Bücher</a>
    </div>
    <div class="nav-right">
      <span class="nav-user">{{ userName }}</span>
      <button class="nav-logout" (click)="logout()">Logout</button>
    </div>
  </nav>
  `
})
export class AppComponent implements OnInit {
  userName = '';
  private keycloak = inject(Keycloak);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getMe().subscribe({
      next: user => {
        this.userName = user.name;
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}