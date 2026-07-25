import { Routes } from '@angular/router';
import Login from './components/auth/login/login';
import Home from './components/home/home';
import { permissionsGuard } from './components/auth/guard/permissions-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    title: 'Inicio de sesión',
  },
  {
    path: 'home',
    canActivate: [permissionsGuard],
    loadComponent: () => import('./components/home/home'),
    title: 'Inicio',
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register'),
    title: 'Registro de usuario',
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound') },
];
