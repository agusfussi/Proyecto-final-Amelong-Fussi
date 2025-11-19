import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const publicGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.token){
    const loginPath = router.parseUrl("");
      return new RedirectCommand(loginPath, {
        skipLocationChange: true,
      });
  }
  return true;
};
