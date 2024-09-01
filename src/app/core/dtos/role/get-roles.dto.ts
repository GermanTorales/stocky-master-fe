import { IRoleEntity } from '@core/models'
import { ISuccessResponse } from '../http.dto'

export interface IGetRolesDataDto {
  list: Pick<IRoleEntity, 'id' | 'name'>[]
  count: number
}

export interface IGetRolesDto extends ISuccessResponse<IGetRolesDataDto> {}
