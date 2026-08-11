import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageAnimals } from '../models/animal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.APIURL}api/animal`;

  searchAnimals(): Observable<PageAnimals> {
    return this.http.get<PageAnimals>(this.apiUrl);
  }
}
