export type HTTPError<T> = {
  status?: number
  data: T
}

export type DefaultError = {
  data: null
  error: {
    errors?: {
      [key: string]: string[]
    }
    error?: string
  }
  success: number
}
