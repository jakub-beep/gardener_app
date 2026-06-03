import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

import { GardenStore } from '../../store/garden.store';
import { NewGardenModalComponent } from '../newGardenModal/newGardenModal';
import { GardenService } from '../../services/garden.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  imports: [CommonModule, NewGardenModalComponent],
})
export class DashboardComponent implements OnInit {
  isNewGardenModalOpen = false;

  constructor(
    public gardenStore: GardenStore,
    private gardenService: GardenService,
  ) {}

  openNewGardenModal() {
    this.isNewGardenModalOpen = true;
  }

  closeNewGardenModal() {
    this.isNewGardenModalOpen = false;
  }

  ngOnInit(): void {
    this.gardenService.getGardens().subscribe({
      next: (data) => {
        this.gardenStore.gardens.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
