import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private url = 'http://localhost:9090/api/v1/users';

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.url}/me`);
  }
}