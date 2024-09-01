import { IUserEntity } from '@dashboard/pages/users/models'

export interface IEnterpriseEntity {
  id: string
  name: string
  description: string
  cuit: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  contact_number: string
  email_address: string
  website: string
  status: string
  logo: string
  is_active: boolean
  users?: IUserEntity[]
  created_at?: Date
  updated_at?: Date
}
