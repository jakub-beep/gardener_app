export interface IPlant {
  id: number;
  name: string;
  species: string;
  description: string;
  watering_frequency_days: number;
  last_watered_at: Date;
}
