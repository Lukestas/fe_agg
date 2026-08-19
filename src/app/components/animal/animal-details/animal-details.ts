import { Component, input, output } from '@angular/core';
import { AnimalResponse } from '../models/animal';
import { AuthService } from '../../auth/service/auth-service';

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

  constructor(public authService: AuthService) {}

  onClose() {
    this.closeModal.emit();
  }

  onEdit() {
    this.editAnimal.emit();
  }
}
