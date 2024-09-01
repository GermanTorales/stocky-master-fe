import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { IGetEnterprisesResDto } from '../dtos'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class EnterpriseService {
  private baseUrl: string = environment.apiUrl

  constructor(private readonly http: HttpClient) {}

  getEnterprises(): Observable<IGetEnterprisesResDto> {
    return this.http.get<IGetEnterprisesResDto>(`${this.baseUrl}/v1/enterprises`)
  }
}
