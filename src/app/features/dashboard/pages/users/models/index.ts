export enum EUserStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DELETED = 'deleted',
  FORGOT_PASSWORD = 'forgot_password',
  PENDING_ON_BOARDING = 'pending_on_boarding',
}

export interface IUserRole {
  name: string
}

export interface IUserEntity {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  status: EUserStatus
  phone_number: string
  phone_number_verified: boolean
  email_verified: boolean
  address: string
  city: string
  state: string
  zip: string
  country: string
  is_active: boolean
  role: IUserRole
  last_login: Date
  enterprise?: string
  permissions?: string[]
  created_at?: Date
  updated_at?: Date
}
