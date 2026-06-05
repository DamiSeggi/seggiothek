import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from './core/services/user.service';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <main>
      <router-outlet />
    </main>

    <nav class="bottom-nav">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Meine Ausleihen</a>
      <a routerLink="/books" routerLinkActive="active">Bücher</a>
      <span class="user-name">{{ userName }}</span>
      <button (click)="logout()">Logout</button>
    </nav>
  `,
  styles: [`
    main {
      padding: 1rem;
      padding-bottom: 60px;
    }
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: #fff;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;
    }
    .bottom-nav a {
      flex: 1;
      text-align: center;
      text-decoration: none;
      color: #333;
    }
    .bottom-nav a.active {
      font-weight: bold;
      color: #000;
    }
    .user-name {
      padding-right: 0.5rem;
      font-size: 0.85rem;
      color: #666;
    }
  `]
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