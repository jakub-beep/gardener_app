import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tool {
  id: number;
  name: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tool.html',
})
export class ToolComponent {
  tools = signal<Tool[]>([
    {
      id: 1,
      name: 'Shovel',
      quantity: 1,
      description: 'Used for digging',
    },
    {
      id: 2,
      name: 'Watering Can',
      quantity: 2,
      description: 'Used for watering plants',
    },
  ]);

  newTool = signal({
    name: '',
    quantity: 1,
    description: '',
  });

  addTool() {
    const tool = this.newTool();

    if (!tool.name.trim()) {
      return;
    }

    this.tools.update((tools) => [
      ...tools,
      {
        id: Date.now(),
        ...tool,
      },
    ]);

    this.newTool.set({
      name: '',
      quantity: 1,
      description: '',
    });
  }
}
