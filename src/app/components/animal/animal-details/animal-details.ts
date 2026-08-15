import { Component, input, output } from '@angular/core';
import { AnimalResponse, CategoryResponse } from '../models/animal';

@Component({
  selector: 'app-animal-details',
  imports: [],
  templateUrl: './animal-details.html',
})
export class AnimalDetails {
  animal = input<AnimalResponse>();
  open = input(false);
  closeModal = output<void>();

  onClose() {
    this.closeModal.emit();
  }
}
