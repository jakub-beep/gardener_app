import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8000';

  getAllTools() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.API}/tools`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
