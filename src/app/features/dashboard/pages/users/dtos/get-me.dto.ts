import { IUserEntity } from '../models'

export interface IGetMeDto {
  data: IUserEntity
  isError: boolean
  message: string
  path: string
  status: number
  timestamp: string
}
