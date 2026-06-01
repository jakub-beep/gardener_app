import { Injectable, signal } from '@angular/core';

import { IGarden, INewGarden } from '../interfaces/garden.interface';

@Injectable({
  providedIn: 'root',
})
export class GardenStore {
  gardens = signal<IGarden[]>([]);
  newGarden = signal<INewGarden>({
    name: '',
    tools: [],
    plants: [],
    garden_area: 0,
    has_water_pool: false,
  });
}
