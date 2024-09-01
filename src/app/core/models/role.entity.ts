import { IPermissionEntity } from './permission.entity'

export interface IRoleEntity {
  id: string
  name: string
  permissions?: IPermissionEntity[]
  created_at?: Date
  updated_at?: Date
}
