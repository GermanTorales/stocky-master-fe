import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { IPermissionEntity } from '@core/models'
import { environment } from 'src/environments/environment'
import { IGetPermissionsDto } from '@core/dtos/permission'

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private baseUrl: string = environment.apiUrl

  constructor(private readonly http: HttpClient) {}

  getPermissions(): Observable<IGetPermissionsDto> {
    return this.http.get<IGetPermissionsDto>(`${this.baseUrl}/v1/permissions`)
  }

  assignPermissionToRole(id: string, roleId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/permissions/${id}/assign`, { roleId })
  }

  createPermission(data: Partial<IPermissionEntity>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/permissions`, data)
  }
  updatePermission(id: string, data: Partial<IPermissionEntity>): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/v1/permissions/${id}`, data)
  }

  deletePermission(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/permissions/${id}`)
  }
}
