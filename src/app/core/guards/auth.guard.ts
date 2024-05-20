import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const authGuard: CanActivateFn = (activatedRoute, state) => {
  return inject(AuthService).isLoggedIn()
    ? true
    : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login']);
};
