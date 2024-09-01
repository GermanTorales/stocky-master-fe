import { IRoleEntity } from '@core/models'

export interface ICreateRoleDto extends Pick<IRoleEntity, 'name'> {
  name: string
}

export interface IRoleCreatedDto {
  data: IRoleEntity
}
