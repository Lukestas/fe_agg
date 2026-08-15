import { Component, OnInit, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AnimalService } from '../service/animal-service';
import { AnimalCreateRequest, AnimalResponse, CategoryResponse } from '../models/animal';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-animal-form',
  imports: [FormField],
  templateUrl: './animal-form.html',
})
export default class AnimalForm implements OnInit {
  categories = signal<CategoryResponse[]>([]);
  animal: AnimalResponse | undefined;

  isEditing = signal(false);

  animalFormModel = signal({
    scientificName: '',
    popularName: '',
    category: '',
    description: '',
    diet: '',
    imageUrl: '',
    isExtinct: false,
  });

  animalForm = form(this.animalFormModel, (path) => {
    required(path.category, { message: 'La categoria es requerida' });
    required(path.popularName, { message: 'El nombre popular es requerido' });
    required(path.scientificName, { message: 'El nombre cientifico es requerido' });
  });

  constructor(
    private animalApi: AnimalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.animalApi.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
    });
    const animalId = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      this.isEditing.set(true);
      this.animalApi.getAnimalById(Number(animalId)).subscribe({
        next: (res) => {
          this.animal = res;
          this.animalFormModel.set({
            diet: res.diet,
            category: String(res.category.categoryId),
            description: res.description,
            imageUrl: res.imageUrl,
            isExtinct: res.isExtinct,
            popularName: res.popularName,
            scientificName: res.scientificName,
          });
        },
      });
    }
  }

  onCategoryChange(e: Event) {
    const category = e.target as HTMLSelectElement;
    const value = category.value;
    this.animalFormModel.update((model) => ({
      ...model,
      category: value,
    }));
    this.animalForm.category().markAsTouched();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.animalForm().markAsTouched();

    if (this.animalForm().invalid()) {
      return;
    }

    const formValue = this.animalFormModel();
    const categoryId = Number(formValue.category);

    if (Number.isNaN(categoryId) || categoryId <= 0) {
      return;
    }

    const saveRequest: AnimalCreateRequest = {
      scientificName: formValue.scientificName.trim(),
      popularName: formValue.popularName.trim(),
      category: { categoryId },
      description: formValue.description.trim(),
      diet: formValue.diet.trim(),
      imageUrl: formValue.imageUrl.trim(),
      isExtinct: formValue.isExtinct,
    };

    if (this.isEditing()) {
      this.animalApi.updateAnimal(this.animal?.animalId!, saveRequest).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al guardar el animal:', err);
        },
      });
    } else {
      this.animalApi.saveAnimal(saveRequest).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error al guardar el animal:', err);
        },
      });
    }
  }
}
