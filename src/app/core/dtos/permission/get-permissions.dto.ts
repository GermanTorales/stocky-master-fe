import { IPermissionEntity } from '@core/models'
import { ISuccessResponse } from '../http.dto'

export interface IGetPermissionsDataDto {
  list: Pick<IPermissionEntity, 'id' | 'name' | 'description'>[]
  count: number
}

export interface IGetPermissionsDto extends ISuccessResponse<IGetPermissionsDataDto> {}
