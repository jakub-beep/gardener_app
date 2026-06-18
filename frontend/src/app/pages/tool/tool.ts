import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faWrench } from '@fortawesome/free-solid-svg-icons';

import { ToolService } from '../../services/tool.service';
import { ToolStore } from '../../store/tool.store';
import { GardenStore } from '../../store/garden.store';
import { LeftNavComponent } from '../leftNav/leftNav';

interface ITool {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, LeftNavComponent],
  templateUrl: './tool.html',
})
export class ToolComponent {
  searchTerm = '';
  openedToolId: number | null = null;
  faPlus = faPlus;
  faWrench = faWrench;

  constructor(
    public toolStore: ToolStore,
    private toolService: ToolService,
    public gardenStore: GardenStore,
  ) {}

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe({
      next: (data) => {
        this.toolStore.tools.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  filterTools(): ITool[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.toolStore.tools();
    }

    return this.toolStore
      .tools()
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(term) || tool.description.toLowerCase().includes(term),
      );
  }

  isValidGardenName(name: string): boolean {
    return this.gardenStore
      .gardens()
      .some((garden) => garden.name.toLowerCase() === name.trim().toLowerCase());
  }

  addToolToGarden(toolId: number, gardenId: number) {
    console.log(`Adding tool ${toolId} to garden ${gardenId}`);
  }

  toggleGardenMenu(toolId: number): void {
    this.openedToolId = this.openedToolId === toolId ? null : toolId;
  }
}
