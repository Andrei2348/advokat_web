import { UserData } from '@/types/user'

export type LoginFormPayload = {
  email: string
  password: string
}

export type RegistrationPayload = {
  name: string
  lastname: string
  surname: string
  type: string
  email: string
  phone: string
  password: string
  repeatPassword: string
}

export type MessageFormSuccessResponse = {
  success: number
  data: string
  error: null | string
}

export type SMSLoginFormPayload = {
  code: string
  email: string
}
export type RecoveryPasswordPayload = {
  email: string
}
export type AuthFormSuccessResponse = {
  success: 1
  data: {
    accessToken: string
    tokenType: string
    expiresIn: number
    user: UserData
  }
  error: null
}

export type UserLogoutResponse = {
  success: number
  error: null | string
  message: string
}
