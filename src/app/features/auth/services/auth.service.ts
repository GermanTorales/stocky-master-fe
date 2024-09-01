import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { distinctUntilChanged, tap } from 'rxjs/operators'

import { JwtService } from '@core/services'
import { IUserLoginDto } from '@auth/dtos'
import { IToken, ITokenPayload } from '@auth/models'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = environment.apiUrl
  private currentUserSubject = new BehaviorSubject<IToken | null>(null)
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged())

  constructor(private readonly http: HttpClient, private readonly jwtService: JwtService, private readonly router: Router) {}

  signUp(credentials: IUserLoginDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/auth/sign-up`, credentials).pipe(tap(({ data }) => this.setAuth(data)))
  }

  signIn(credentials: IUserLoginDto): Observable<{ data: IToken }> {
    return this.http.post<{ data: IToken }>(`${this.baseUrl}/v1/auth/sign-in`, credentials).pipe(tap(({ data }) => this.setAuth(data)))
  }

  verificationEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/auth/send-verification-email`, { email })
  }

  verifyEmail(token: number, email: string): Observable<{ data: IToken }> {
    return this.http.post<{ data: IToken }>(`${this.baseUrl}/v1/auth/verify-email`, { token, email }).pipe(tap(({ data }) => this.setAuth(data)))
  }

  createPassword(data: IUserLoginDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/auth/create-password`, data)
  }

  setAuth(data: IToken): void {
    this.jwtService.saveToken(data.access_token)

    this.currentUserSubject.next(data)
  }

  purgeAuth(): void {
    this.jwtService.destroyToken()

    this.currentUserSubject.next(null)
  }

  isAuthenticated(): boolean {
    const token: string = localStorage.getItem('token') || ''

    return !!token
  }

  hasRole(requiredRole: string[]): boolean {
    const token = localStorage.getItem('token')

    if (!token) return false

    const decoded: ITokenPayload = jwtDecode(token)

    return requiredRole.includes(decoded.role)
  }

  hasStatus(requiredStatus: string): boolean {
    const token = localStorage.getItem('token')

    if (!token) return false

    const decoded: ITokenPayload = jwtDecode(token)

    return decoded.status === requiredStatus
  }
}
