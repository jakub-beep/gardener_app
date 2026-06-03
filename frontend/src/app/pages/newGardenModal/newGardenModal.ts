import { Component, computed, EventEmitter, Output } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { PlantStore } from '../../store/plant.store';
import { ToolService } from '../../services/tool.service';
import { ToolStore } from '../../store/tool.store';
import { GardenStore } from '../../store/garden.store';
import { GardenService } from '../../services/garden.service';
@Component({
  selector: 'app-new-garden-modal',
  standalone: true,
  templateUrl: './newGardenModal.html',
})
export class NewGardenModalComponent {
  readonly newGarden = computed(() => this.gardenStore.newGarden());

  constructor(
    private plantService: PlantService,
    public plantStore: PlantStore,
    private toolService: ToolService,
    public toolStore: ToolStore,
    public gardenStore: GardenStore,
    private gardenService: GardenService,
  ) {}

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plantStore.plants.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.toolService.getAllTools().subscribe({
      next: (data) => {
        this.toolStore.tools.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }

  handlePlantSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const selectedPlantIds = selectedOptions.map((option) => Number(option.value));
    this.gardenStore.setSelectedPlants(selectedPlantIds);
  }

  handleToolSelection(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectedElement.selectedOptions);
    const selectedToolIds = selectedOptions.map((option) => Number(option.value));
    this.gardenStore.setSelectedTools(selectedToolIds);
  }

  handleNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.gardenStore.setName(input.value);
  }

  handleGardenAreaChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.gardenStore.setGardenArea(Number(input.value));
  }

  handleWaterPoolChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.gardenStore.setHasWaterPool(input.checked);
  }

  handleSubmit() {
    this.gardenService.createGarden(this.newGarden()).subscribe({
      next: (data) => {
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating garden', err);
      },
    });
  }
}
