import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../../shared/models/entities';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  readonly user = signal<User | null>(null);
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    // Vérifier si un utilisateur est déjà connecté (depuis localStorage)
    this.checkStoredUser();
  }

  private checkStoredUser() {
    // ⚠️ IMPORTANT: Vérifier qu'on est dans le navigateur
    if (!this.isBrowser) {
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.user.set(user);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
  }

  register(account: User) {
    return this.http.post<User>(`${environment.serverUrl}/api/user`, account);
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .get<User>(`${environment.serverUrl}/api/account`, {
        headers: {
          Authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password),
        },
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (this.isBrowser) {
            localStorage.setItem('user', JSON.stringify(response));
          }
          this.user.set(response);
        })
      );
  }

  logout() {
    return this.http
      .post(`${environment.serverUrl}/api/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          if (this.isBrowser) {
            localStorage.removeItem('user');
          }
          this.user.set(null);
        })
      );
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  // Récupérer l'utilisateur courant
  getCurrentUser(): User | null {
    return this.user();
  }
}
