import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    //return { ...this.user }; // se podria usar el spread tambien para devolver una copia
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        this.user = user;
      }),
      tap((user) => {
        localStorage.setItem('token', 'sdadad.adas.8d8a6da778KHFGU');
      })
    );
  }

  checkSessionStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
