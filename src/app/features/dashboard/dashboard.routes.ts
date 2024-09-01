import { Routes } from '@angular/router'
import { AuthGuard, RoleGuard, StatusGuard } from '@core/guards'

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component'),
        canActivate: [AuthGuard, StatusGuard, RoleGuard],
        data: { role: 'admin', status: 'active', redirectTo: '/dashboard' },
      },
      {
        path: 'roles',
        loadComponent: () => import('./pages/roles/roles.component'),
        canActivate: [AuthGuard, StatusGuard, RoleGuard],
        data: { role: 'admin', status: 'active', redirectTo: '/dashboard' },
      },
      {
        path: 'enterprises',
        loadComponent: () => import('./pages/enterprises/enterprises.component'),
        canActivate: [AuthGuard, StatusGuard, RoleGuard],
        data: { role: 'admin', status: 'active', redirectTo: '/dashboard' },
      },
      {
        path: 'permissions',
        loadComponent: () => import('./pages/permissions/permissions.component'),
        canActivate: [AuthGuard, StatusGuard, RoleGuard],
        data: { role: 'admin', status: 'active', redirectTo: '/dashboard' },
      },
    ],
  },
]

export default routes
