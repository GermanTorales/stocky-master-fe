import { ISuccessResponse } from '@core/dtos'
import { IEnterpriseEntity } from '../models'

export interface IGetEnterprisesDto
  extends Pick<
    IEnterpriseEntity,
    | 'id'
    | 'name'
    | 'description'
    | 'cuit'
    | 'address'
    | 'city'
    | 'state'
    | 'zip'
    | 'country'
    | 'contact_number'
    | 'email_address'
    | 'is_active'
    | 'logo'
    | 'status'
    | 'website'
    | 'users'
  > {}

export interface IGetEnterprisesDataDto {
  list: IGetEnterprisesDto[]
  total: number
}

export interface IGetEnterprisesResDto extends ISuccessResponse<IGetEnterprisesDataDto> {}
