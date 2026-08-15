import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AnimalFilterRequest, AnimalResponse, CategoryResponse } from '../models/animal';
import { AnimalService } from '../service/animal-service';
import { AnimalDetails } from '../animal-details/animal-details';

@Component({
  selector: 'app-animal-list',
  imports: [AnimalDetails],
  templateUrl: './animal-list.html',
})
export class AnimalList implements OnInit {
  animals = signal<AnimalResponse[]>([]);
  loading = signal(false);
  totalPages = signal(1);
  currentPage = signal(1);
  pages = Array.from({ length: this.totalPages() });

  //filters
  categories = signal<CategoryResponse[]>([]);
  openFilterMenu = signal(false);
  popularNameFilter = signal('');
  scientificNameFilter = signal('');
  categoryFilter = signal<number | undefined>(undefined);
  isExtinctFilter = signal<boolean | undefined>(undefined);

  //modal
  openDetailModal = signal(false);
  animalSelected = signal<AnimalResponse | undefined>(undefined);

  constructor(private animalApi: AnimalService) {}

  ngOnInit(): void {
    this.loadAnimals();
    this.loadCategories();
  }

  private loadCategories() {
    this.animalApi.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
    });
  }

  private loadAnimals() {
    this.loading.set(true);
    this.animals.set([]);

    const filters: AnimalFilterRequest = {
      category: this.categoryFilter(),
      isExtinct: this.isExtinctFilter(),
      popularName: this.popularNameFilter().trim() || undefined,
      scientificName: this.scientificNameFilter().trim() || undefined,
    };

    this.animalApi.searchAnimals(filters).subscribe({
      next: (res) => {
        this.animals.set(res.content);
        this.loading.set(false);
        this.totalPages.set(res.totalPages);
        this.currentPage.set(res.number + 1);
      },
    });
  }

  openDetails(animal: AnimalResponse) {
    console.log('Abriendo Modal');
    this.openDetailModal.set(true);
    this.animalSelected.set(animal);
  }

  closeDetailModal() {
    this.openDetailModal.set(false);
    this.animalSelected.set(undefined);
  }

  changeFilters() {
    this.loadAnimals();
  }

  onCategoryChange(e: Event) {
    const category = e.target as HTMLSelectElement;
    const value = category.value;
    this.categoryFilter.set(value === '' ? undefined : Number(value));
    this.changeFilters();
  }

  onStatusChange(e: Event) {
    const status = e.target as HTMLSelectElement;
    const value = status.value;
    this.isExtinctFilter.set(value === '' ? undefined : value === 'true');
    this.changeFilters();
  }
}
