import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const protectedRoute: boolean = true;

  if (protectedRoute) {
    router.navigate(['/tournaments']);
    return false;
  }
  return true;
};