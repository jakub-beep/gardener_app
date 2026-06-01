import { Injectable, signal } from '@angular/core';

import { ITool } from './tool.store';
import { IPlant } from './plant.store';

export interface IGarden {
  id: number;
  name: string;
  owner_id: number;
  tools: ITool[];
  plants: IPlant[];
}

@Injectable({
  providedIn: 'root',
})
export class GardenStore {
  gardens = signal<IGarden[]>([]);
}
