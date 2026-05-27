import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

import { NewGardenModalComponent } from '../newGardenModal/newGardenModal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  imports: [CommonModule, NewGardenModalComponent],
})
export class DashboardComponent implements OnInit {
  gardens = signal<any[]>([]);
  isNewGardenModalOpen = false;

  constructor(private http: HttpClient) {}

  openNewGardenModal() {
    this.isNewGardenModalOpen = true;
  }

  closeNewGardenModal() {
    this.isNewGardenModalOpen = false;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.http
      .get<any[]>('http://localhost:8000/gardens/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.gardens.set(data);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
