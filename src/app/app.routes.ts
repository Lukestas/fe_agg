import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login'),
    title: 'Inicio de sesión',
  },
  {
    path: '',
    loadComponent: () => import('./components/home/home'),
    title: 'Inicio',
  },
  {
    path: 'animal/crear',
    loadComponent: () => import('./components/animal/animal-form/animal-form'),
    title: 'Agregar nuevo animal',
  },
  {
    path: 'animal/editar/:id',
    loadComponent: () => import('./components/animal/animal-form/animal-form'),
    title: 'Editar animal',
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register'),
    title: 'Registro de usuario',
  },
  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound'),
    title: 'Página no encontrada',
  },
];
