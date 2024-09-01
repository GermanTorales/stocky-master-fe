import { FormControl } from '@angular/forms'

export interface ILoginFormDto {
  email: FormControl<string>
  password: FormControl<string>
}

export interface IRegisterFormDto {
  email: FormControl<string>
  password: FormControl<string>
}

export interface IOnBoardingFormDto {
  first_name: FormControl<string>
  last_name: FormControl<string>
  phone_number: FormControl<string | null>
  address: FormControl<string | null>
  city: FormControl<string | null>
  state: FormControl<string | null>
  country: FormControl<string | null>
  zip: FormControl<string | null>
}

export interface ICreatePasswordFormDto {
  password: FormControl<string>
  confirm_password: FormControl<string>
}
