import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router'

import { AuthService } from '@auth/services/auth.service'

@Injectable({ providedIn: 'root' })
class StatusService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredStatus = route.data['status']
    const redirectTo = route.data['redirectTo']

    if (!this.authService.hasStatus(requiredStatus)) {
      this.router.navigate([redirectTo])

      return false
    }

    return true
  }
}

export const StatusGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean => {
  return inject(StatusService).canActivate(next)
}
