import { Component, input, output } from '@angular/core';
import { AnimalResponse } from '../models/animal';

@Component({
  selector: 'app-animal-details',
  imports: [],
  templateUrl: './animal-details.html',
})
export class AnimalDetails {
  animal = input<AnimalResponse>();
  open = input(false);
  closeModal = output<void>();
  editAnimal = output<void>();

  onClose() {
    this.closeModal.emit();
  }

  onEdit() {
    this.editAnimal.emit();
  }
}
