import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../service/auth';
import { routes } from '../../app.routes';

/**
 * Guard de autenticacion - Protege rutas que requieren un usuario autenticado
 */

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Verificar si el usuario esta autenticado
  if(auth.isAuthenticated()){
    return true;
  } else {
    console.warn('Acceso denegado. Redirigiendo al login.');
    return router.createUrlTree(['/login']);
  }
};

/**
 * Guard para rutas publicas (login y registro)
 */

export const publicGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Si el user ya esta autenticado, redirigir al feed
  if(auth.isAuthenticated()){
    console.log("Usuario ya autenticado. Redirigiendo al feed.");
    return router.createUrlTree(['/feed']);
  }

  return true;
};
