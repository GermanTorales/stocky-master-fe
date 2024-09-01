import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router'

import { AuthService } from '@auth/services/auth.service'

@Injectable({ providedIn: 'root' })
class RoleService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role']
    const redirectTo = route.data['redirectTo']

    if (!this.authService.hasRole(requiredRole)) {
      this.router.navigate([redirectTo])

      return false
    }

    return true
  }
}

export const RoleGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean => {
  return inject(RoleService).canActivate(next)
}
