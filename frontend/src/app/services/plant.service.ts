import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8000';

  getAllPlants() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.API}/plants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
