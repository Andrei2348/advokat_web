export type HTTPError<T> = {
  status?: number
  data: T
}

type Errors = {
  [key: string]: string[]
}

export type DefaultError = {
  data: null
  error: {
    errors?: Errors
    error?: string
  }
  success: number
}

export type Error = {
  errors?: Errors
  message: string
}
