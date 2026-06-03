import { Injectable, signal } from '@angular/core';

import { IGarden, INewGarden } from '../interfaces/garden.interface';

@Injectable({
  providedIn: 'root',
})
export class GardenStore {
  gardens = signal<IGarden[]>([]);
  newGarden = signal<INewGarden>({
    name: '',
    tool_ids: [],
    plant_ids: [],
    garden_area: 0,
    has_water_pool: false,
  });

  setSelectedPlants(plant_ids: number[]) {
    this.newGarden.update((garden) => ({
      ...garden,
      plant_ids,
    }));
  }

  setSelectedTools(tool_ids: number[]) {
    this.newGarden.update((garden) => ({
      ...garden,
      tool_ids,
    }));
  }

  setName(name: string) {
    this.newGarden.update((garden) => ({
      ...garden,
      name,
    }));
  }

  setGardenArea(area: number) {
    this.newGarden.update((garden) => ({
      ...garden,
      garden_area: area,
    }));
  }

  setHasWaterPool(hasWaterPool: boolean) {
    this.newGarden.update((garden) => ({
      ...garden,
      has_water_pool: hasWaterPool,
    }));
  }
}
