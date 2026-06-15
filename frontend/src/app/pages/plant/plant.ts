import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlantService } from '../../services/plant.service';
import { PlantStore } from '../../store/plant.store';
import { GardenStore } from '../../store/garden.store';
import { LeftNavComponent } from '../leftNav/leftNav';

interface Plant {
  id: number;
  name: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, FormsModule, LeftNavComponent],
  templateUrl: './plant.html',
})
export class PlantComponent {
  searchTerm = '';

  constructor(
    public plantStore: PlantStore,
    private plantService: PlantService,
    public gardenStore: GardenStore,
  ) {}

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plantStore.plants.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  filterPlants() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.plantStore.plants();
    }

    return this.plantStore
      .plants()
      .filter(
        (plant) =>
          plant.name.toLowerCase().includes(term) || plant.species.toLowerCase().includes(term),
      );
  }

  isValidGardenName(name: string): boolean {
    return this.gardenStore
      .gardens()
      .some((garden) => garden.name.toLowerCase() === name.trim().toLowerCase());
  }

  addPlantToGarden(plantName: string, gardenName: string) {
    console.log(`Adding plant ${plantName} to garden ${gardenName}`);
  }
}
