import { ITool } from './tool.interface';
import { IPlant } from './plant.interface';

export interface IGarden {
  id: number;
  name: string;
  owner_id: number;
  tools: ITool[];
  plants: IPlant[];
  garden_area: number;
  has_water_pool: boolean;
}

export interface INewGarden {
  name: string;
  tools: ITool[];
  plants: IPlant[];
  garden_area: number;
  has_water_pool: boolean;
}
