import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { AnimalFilterRequest, AnimalResponse, CategoryResponse } from '../models/animal';
import { AnimalService } from '../service/animal-service';
import { AnimalDetails } from '../animal-details/animal-details';
import { Router } from '@angular/router';

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
  totalPerPageFilter = signal<number>(Number(localStorage.getItem('totalPerPage') ?? 10));
  pageFilter = signal(0);

  //modal
  openDetailModal = signal(false);
  animalSelected = signal<AnimalResponse | undefined>(undefined);

  // Computed para calcular las páginas a mostrar (máximo 4)
  displayPages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const maxPages = 4;
    let start = Math.max(1, current - Math.floor(maxPages / 2));
    let end = Math.min(total, start + maxPages - 1);

    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  constructor(
    private animalApi: AnimalService,
    private router: Router,
  ) {
    effect(() => {
      localStorage.setItem('totalPerPage', this.totalPerPageFilter().toString());
    });
  }

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
      page: this.pageFilter(),
      totalPerPage: this.totalPerPageFilter(),
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

  editAnimal() {
    this.openDetailModal.set(false);
    this.router.navigate([`/animal/editar/${this.animalSelected()?.animalId}`]);
  }

  changeFilters() {
    this.loadAnimals();
    this.pageFilter.set(0);
  }

  changePage() {
    this.loadAnimals();
  }

  onChangeTotalPerPage(e: Event) {
    const animalsPerPage = e.target as HTMLInputElement;
    const value = animalsPerPage.value;
    this.totalPerPageFilter.set(Number(value));
    localStorage.setItem('totalPerPage', value);
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

  // Métodos de navegación
  canGoPrevious(): boolean {
    return this.currentPage() > 1;
  }

  canGoNext(): boolean {
    return this.currentPage() < this.totalPages();
  }

  previousPage(): void {
    if (this.canGoPrevious()) {
      this.pageFilter.set(this.pageFilter() - 1);
      this.changePage();
    }
  }

  nextPage(): void {
    if (this.canGoNext()) {
      this.pageFilter.set(this.pageFilter() + 1);
      this.changePage();
    }
  }

  goToPage(pageNumber: number): void {
    this.pageFilter.set(pageNumber - 1);
    this.changePage();
  }
}
