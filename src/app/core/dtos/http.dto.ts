export interface ISuccessResponse<T> {
  data: T
  status: number
  message: string
  isError: boolean
  timestamp: string
  path: string
}
