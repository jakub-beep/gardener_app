import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewGarden } from '../interfaces/garden.interface';

@Injectable({
  providedIn: 'root',
})
export class GardenService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8000';

  getGardens() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.API}/gardens/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createGarden(gardenData: INewGarden) {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.API}/gardens`, gardenData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
