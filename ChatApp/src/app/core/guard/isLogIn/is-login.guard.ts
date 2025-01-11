import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router=inject(Router)
  if(token){
      return router.navigate(['/home'])
  }
  return true;
};
