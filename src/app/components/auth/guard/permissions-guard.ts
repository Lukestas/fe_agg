import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permissionsGuard: CanActivateFn = () => {
  const router = inject(Router);
  const logged = localStorage.getItem('logged') === 'true';
  return logged ? true : router.createUrlTree(['/']);
};
