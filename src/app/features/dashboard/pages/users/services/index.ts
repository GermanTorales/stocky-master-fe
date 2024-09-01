import { Observable, tap } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { IUserEntity } from '../models'
import { environment } from 'src/environments/environment'
import { CreateUserDto, IOnBoardingDto, IGetMeDto, IGetUsersResDto } from '../dtos'

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string = environment.apiUrl

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<IGetUsersResDto> {
    return this.http.get<IGetUsersResDto>(`${this.baseUrl}/v1/users`)
  }

  getUsersWithoutEnterprise(): Observable<IGetUsersResDto> {
    return this.http.get<IGetUsersResDto>(`${this.baseUrl}/v1/users/?withoutEnterprise=true&status=active`)
  }

  getMe(): Observable<IGetMeDto> {
    return this.http.get<IGetMeDto>(`${this.baseUrl}/v1/users/me`)
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v1/users/${id}`)
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/v1/users/${id}`, data)
  }

  onBoarding(data: IOnBoardingDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/v1/users/on-boarding`, data)
  }

  createUser(data: CreateUserDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/users`, data)
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/users/${id}`)
  }

  setUser(user: IUserEntity): void {
    localStorage.setItem('me', JSON.stringify(user))
  }
}
