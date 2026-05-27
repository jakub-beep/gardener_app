import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post(`${this.API}/register`, { email, password });
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.API}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
      }),
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
