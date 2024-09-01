import { inject } from '@angular/core'
import { HttpInterceptorFn } from '@angular/common/http'
import { JwtService } from '@core/services'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken()

  const request = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  return next(request)
}