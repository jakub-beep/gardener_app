import { Injectable, signal } from '@angular/core';

import { IPlant } from '../interfaces/plant.interface';

@Injectable({
  providedIn: 'root',
})
export class PlantStore {
  plants = signal<IPlant[]>([]);
}
