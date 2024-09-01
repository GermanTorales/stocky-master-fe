import { FormControl } from '@angular/forms'
import { IUserEntity } from '../models'

export interface CreateUserDto extends Pick<IUserEntity, 'email' | 'first_name' | 'last_name' | 'address' | 'city' | 'state' | 'country' | 'zip'> {
  email: string
  first_name: string
  last_name: string
  address: string
  city: string
  state: string
  country: string
  zip: string
  role_id: string
}

export interface ICreateUserForm {
  email: FormControl<string>
  first_name: FormControl<string>
  last_name: FormControl<string>
  address: FormControl<string>
  city: FormControl<string>
  state: FormControl<string>
  country: FormControl<string>
  zip: FormControl<string>
  role_id: FormControl<string>
}
