import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AnimalCreateRequest,
  AnimalFilterRequest,
  AnimalResponse,
  CategoryResponse,
  PageAnimals,
} from '../models/animal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.APIURL}api`;

  searchAnimals(filters: AnimalFilterRequest): Observable<PageAnimals> {
    let params = new HttpParams();
    if (filters.category !== undefined) {
      params = params.set('category', filters.category);
    }
    if (filters.isExtinct !== undefined) {
      params = params.set('isExtinct', filters.isExtinct);
    }
    if (filters.popularName !== undefined) {
      params = params.set('popularName', filters.popularName);
    }
    if (filters.scientificName !== undefined) {
      params = params.set('scientificName', filters.scientificName);
    }
    if (filters.page !== undefined) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.totalPerPage !== undefined) {
      params = params.set('totalPerPage', filters.totalPerPage.toString());
    }
    return this.http.get<PageAnimals>(`${this.apiUrl}/animal`, { params });
  }

  getCategories() {
    return this.http.get<CategoryResponse[]>(`${this.apiUrl}/category`);
  }

  saveAnimal(animal: AnimalCreateRequest) {
    return this.http.post(`${this.apiUrl}/animal`, animal);
  }

  getAnimalById(animalId: number) {
    return this.http.get<AnimalResponse>(`${this.apiUrl}/animal/${animalId}`);
  }

  updateAnimal(animalId: number, animal: AnimalCreateRequest) {
    return this.http.put(`${this.apiUrl}/animal/${animalId}`, animal);
  }
}
