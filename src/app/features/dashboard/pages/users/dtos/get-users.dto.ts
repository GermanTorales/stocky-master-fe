import { ISuccessResponse } from '@core/dtos'
import { IUserEntity } from '../models'

export interface IGetUsersDto {
  list: IUserEntity[]
  count: number
}

export interface IGetUsersResDto extends ISuccessResponse<IGetUsersDto> {}
