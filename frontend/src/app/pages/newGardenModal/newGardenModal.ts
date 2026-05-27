import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-garden-modal',
  standalone: true,
  templateUrl: './newGardenModal.html',
})
export class NewGardenModalComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
