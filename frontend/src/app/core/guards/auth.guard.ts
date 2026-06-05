import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Keycloak from 'keycloak-js';

export const adminGuard: CanActivateFn = () => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  const roles: string[] = (keycloak.tokenParsed as any)?.roles ?? [];

  if (roles.includes('ROLE_admin')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};