import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment'
import { IGetRolesDto, IUpdateRoleDto } from '@core/dtos/role'
import { ICreateRoleDto, IRoleCreatedDto } from '@core/dtos/role/create-role.dto'

@Injectable({ providedIn: 'root' })
export class RoleService {
  private baseUrl: string = environment.apiUrl

  constructor(private readonly http: HttpClient) {}

  getRoles(): Observable<IGetRolesDto> {
    return this.http.get<IGetRolesDto>(`${this.baseUrl}/v1/roles`)
  }

  createRole(role: ICreateRoleDto): Observable<IRoleCreatedDto> {
    return this.http.post<IRoleCreatedDto>(`${this.baseUrl}/v1/roles`, role)
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/roles/${id}`)
  }

  updateRole(id: string, role: IUpdateRoleDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/v1/roles/${id}`, role)
  }
}
