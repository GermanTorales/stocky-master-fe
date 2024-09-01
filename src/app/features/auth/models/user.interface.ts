export interface IUser {
  id?: string
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  status: string
  phone_number: string
  phone_number_verified: boolean
  email_verified: boolean
  address: string
  city: string
  state: string
  zip: string
  country: string
  is_active: boolean
  role?: any
  role_id: string
  last_login: Date
  enterprise?: any
  enterprise_id: string
  created_at?: Date
  updated_at?: Date
}

export interface IToken {
  access_token: string
  refresh_token: string
}

export interface ITokenPayload {
  id: string
  permissions: string[]
  role: string
  status: string
}
