import { AuthFormSuccessResponse, SMSLoginFormPayload } from '@/types/auth'
import { UserData } from '@/types/user'

export type RootState = {
  token: string | null
  tokenType: string | null
  user: UserData | null
  error: { error: string } | null
}

export type RootGetters = {
  isAuth: (state: RootState) => boolean
}

export type RootActions = {
  clearStore: () => Promise<void>
  smsLogin: (payload: SMSLoginFormPayload) => Promise<void>
  writeData: (payload: AuthFormSuccessResponse['data']) => Promise<void>
  logoutRequest: () => Promise<void>
}
