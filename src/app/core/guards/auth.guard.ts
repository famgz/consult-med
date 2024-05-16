import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (activatedRoute, state) => {
  return inject(AuthService)
    .checkAuthStatus()
    .pipe(
      map((isLoggedIn) => {
        return isLoggedIn
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/', 'auth', 'login']);
      })
    );
};
