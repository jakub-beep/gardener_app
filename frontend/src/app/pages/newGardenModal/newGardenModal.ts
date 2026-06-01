import { Component, EventEmitter, Output } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { PlantStore } from '../../store/plant.store';
import { ToolService } from '../../services/tool.service';
import { ToolStore } from '../../store/tool.store';
@Component({
  selector: 'app-new-garden-modal',
  standalone: true,
  templateUrl: './newGardenModal.html',
})
export class NewGardenModalComponent {
  constructor(
    private plantService: PlantService,
    public plantStore: PlantStore,
    private toolService: ToolService,
    public toolStore: ToolStore,
  ) {}

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        console.log('data plants', data);
        this.plantStore.plants.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.toolService.getAllTools().subscribe({
      next: (data) => {
        console.log('data tools', data);
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
}
