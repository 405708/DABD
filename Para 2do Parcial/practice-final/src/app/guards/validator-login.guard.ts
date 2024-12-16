import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';


export const validatorLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); 
  const router = inject(Router);
    if (authService.user.id=='') {
      return router.parseUrl('');
  }
  return true;
};
