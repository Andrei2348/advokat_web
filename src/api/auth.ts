import axios from 'axios'
import {
  LoginFormPayload,
  MessageFormSuccessResponse,
  SMSLoginFormPayload,
  AuthFormSuccessResponse,
  RecoveryPasswordPayload,
  RegistrationPayload,
  UserLogoutResponse,
} from '@/types/auth'

const loginApiCall = async (
  abortController?: AbortController,
  params?: Partial<LoginFormPayload>,
): Promise<MessageFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/auth/login',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

const registrationApiCall = async (
  abortController?: AbortController,
  params?: Partial<RegistrationPayload>,
): Promise<MessageFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/registration',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

const registrationCodeApiCall = async (
  abortController?: AbortController,
  params?: Partial<SMSLoginFormPayload>,
): Promise<AuthFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/registration/code',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

const smsLoginApiCall = async (
  abortController?: AbortController,
  params?: Partial<SMSLoginFormPayload>,
): Promise<AuthFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/auth/login/complete',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

const recoveryPasswordApiCall = async (
  abortController?: AbortController,
  params?: Partial<RecoveryPasswordPayload>,
): Promise<MessageFormSuccessResponse> => {
  const { data } = await axios.post(
    '/v1/reset-password-link',
    { ...params },
    { signal: abortController?.signal },
  )
  return data
}

const logoutApiCall = async (
  abortController?: AbortController,
): Promise<UserLogoutResponse> => {
  const { data } = await axios.post('/v1/auth/logout', {
    signal: abortController?.signal,
  })
  return data
}

export {
  loginApiCall,
  logoutApiCall,
  smsLoginApiCall,
  recoveryPasswordApiCall,
  registrationApiCall,
  registrationCodeApiCall,
}
