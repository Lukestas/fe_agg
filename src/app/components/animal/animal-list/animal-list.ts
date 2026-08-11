import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AnimalResponse } from '../models/animal';
import { AnimalService } from '../service/animal-service';

@Component({
  selector: 'app-animal-list',
  imports: [],
  templateUrl: './animal-list.html',
})
export class AnimalList implements OnInit {
  animals = signal<AnimalResponse[]>([]);
  loading = signal(false);
  totalPages = signal(1);
  currentPage = signal(1);
  pages = Array.from({ length: this.totalPages() });

  constructor(private animalApi: AnimalService) {}

  filters = {
    popularName: '',
    scientificName: '',
    category: '',
    isExtinct: undefined,
  };

  ngOnInit(): void {
    this.loadAnimals();
  }

  private loadAnimals() {
    this.loading.set(true);
    this.animalApi.searchAnimals().subscribe({
      next: (res) => {
        this.animals.set(res.content);
        this.loading.set(false);
        this.totalPages.set(res.totalPages);
        this.currentPage.set(res.number + 1);
      },
    });
  }

  changeFilters() {}
}
