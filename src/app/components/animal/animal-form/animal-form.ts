import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';

type AnimalCategory = {
  id: number;
  name: string;
};

type AnimalModel = {
  popularName: string;
  scientificName: string;
  categoryId: string;
};

@Component({
  selector: 'app-animal-form',
  imports: [FormField],
  templateUrl: './animal-form.html',
})
export default class AnimalForm {
  readonly categoryOptions = signal<AnimalCategory[]>([
    { id: 1, name: 'Mamífero' },
    { id: 2, name: 'Reptil' },
    { id: 3, name: 'Anfibio' },
    { id: 4, name: 'Ave' },
    { id: 5, name: 'Pez' },
    { id: 6, name: 'Invertebrado' },
  ]);

  animalModel = signal<AnimalModel>({
    popularName: '',
    scientificName: '',
    categoryId: '',
  });

  animalForm = form(this.animalModel, (path) => {
    required(path.popularName, { message: 'El nombre popular es requerido' });
    required(path.scientificName, { message: 'El nombre científico es requerido' });
    validate(path.categoryId, ({ value }) => {
      if (!value() || value() === '0') {
        return {
          message: 'Debes seleccionar una categoría',
          kind: 'error',
        };
      }
      return null;
    });
  });

  onSubmit(): void {
    const formData = this.animalModel();
    const selectedCategory = this.categoryOptions().find(
      (item) => item.id === Number(formData.categoryId),
    );

    console.log('Animal registrado:', {
      ...formData,
      categoryId: Number(formData.categoryId),
      category: selectedCategory?.name ?? 'Sin categoría',
    });
  }

  onReset(): void {
    this.animalModel.set({
      popularName: '',
      scientificName: '',
      categoryId: '',
    });
  }
}
