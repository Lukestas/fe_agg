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
    path: 'new/animal',
    loadComponent: () => import('./components/animal/animal-form/animal-form'),
    title: 'Registro de usuario',
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
