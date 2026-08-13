export interface PageAnimals {
  content: AnimalResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface AnimalResponse {
  animalId: number;
  popularName: string;
  scientificName: string;
  category: CategoryResponse;
  description: string;
  diet: string;
  imageUrl: string;
  isExtinct: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  categoryId: number;
  categoryName: string;
}

export interface AnimalRequest {
  isExtinct?: boolean;
  popularName?: string;
  scientificName?: string;
  category?: number;
  page?: number;
  totalPerPage?: number;
}
