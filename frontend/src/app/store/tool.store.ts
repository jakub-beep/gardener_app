import { Injectable, signal } from '@angular/core';

import { ITool } from '../interfaces/tool.interface';

@Injectable({
  providedIn: 'root',
})
export class ToolStore {
  tools = signal<ITool[]>([]);
}
