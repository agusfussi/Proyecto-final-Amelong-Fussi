import { inject } from '@angular/core';
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const publicChildGuardGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.token){
    const managerPath = router.parseUrl("bar-manager");
      return new RedirectCommand(managerPath, {
        skipLocationChange: true,
      });
  }
  return true;
};
