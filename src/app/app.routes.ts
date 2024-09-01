import { Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth.guard'
import { RoleGuard } from '@core/guards/role.guard'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes'),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['admin', 'user'], redirectTo: '/errors/unauthorized' },
  },
  {
    path: 'errors',
    children: [
      {
        path: 'unauthorized',
        loadComponent: () => import('./shared/errors/unauthorized/unauthorized.component.'),
      },
      {
        path: 'not-found',
        loadComponent: () => import('./shared/errors/not-found/not-found.component'),
      },
      {
        path: '**',
        redirectTo: 'errors/not-found',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'errors/not-found',
    pathMatch: 'full',
  },
]
