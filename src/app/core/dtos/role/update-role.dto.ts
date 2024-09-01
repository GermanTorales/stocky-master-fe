import { IRoleEntity } from '@core/models'

export interface IUpdateRoleDto extends Pick<IRoleEntity, 'name'> {
  name: string
  permissions: string[]
}
