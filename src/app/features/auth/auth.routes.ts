import { Routes } from '@angular/router'

import { StatusGuard, AuthGuard } from '@core/guards'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up/sign-up.component'),
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component'),
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./pages/verify-email/verify-email.component'),
      },
      {
        path: 'on-boarding',
        loadComponent: () => import('./pages/on-boarding/on-boarding.component'),
        canActivate: [AuthGuard, StatusGuard],
        data: { status: 'pending_on_boarding', redirectTo: '/dashboard' },
      },
      {
        path: 'create-password',
        loadComponent: () => import('./pages/create-password/create-password.component'),
      },
    ],
  },
]

export default routes
