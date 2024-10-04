import { defineStore } from 'pinia'
import { RootState, RootGetters, RootActions } from '@/store/auth/types'
import {
  getStorageItemWithExpiry,
  setStorageItemWithExpiry,
} from '@/helpers/localStorageHelpers'
import {
  AuthFormSuccessResponse,
  SMSLoginFormPayload,
  UserLogoutResponse,
} from '@/types/auth'
import { useApiCall } from '@/composables/useApiCall'
import { smsLoginApiCall, logoutApiCall } from '@/api/auth'
import { DefaultError } from '@/types/httpError'
import { UserData } from '@/types/user'
const authToken = getStorageItemWithExpiry<string>('authToken')

export const useAuthStore = defineStore<
  string,
  RootState,
  RootGetters,
  RootActions
>('auth', {
  state: () => {
    if (!authToken) {
      localStorage.clear()
    }
    return {
      token: authToken,
      tokenType: getStorageItemWithExpiry<string>(`tokenType_${authToken}`),
      user: getStorageItemWithExpiry<UserData>(`user_${authToken}`),
      error: null,
    }
  },
  getters: {
    isAuth: (state: RootState) => !!state.token,
  },
  actions: {
    async clearStore() {
      this.token = null
      this.user = null
      localStorage.clear()
    },

    async writeData(payload: AuthFormSuccessResponse['data']) {
      const { accessToken, expiresIn, user, tokenType } = payload
      this.$patch({
        token: accessToken,
        tokenType,
        user,
      })
      setStorageItemWithExpiry('authToken', accessToken, expiresIn * 1000)
      setStorageItemWithExpiry(`user_${accessToken}`, user)
      setStorageItemWithExpiry(`tokenType_${accessToken}`, tokenType)
    },

    async smsLogin(payload: SMSLoginFormPayload) {
      const {
        data: authData,
        executeApiCall: loginAction,
        error: loginError,
      } = useApiCall<
        AuthFormSuccessResponse,
        DefaultError,
        SMSLoginFormPayload
      >(smsLoginApiCall, true, payload)
      this.error = null
      try {
        await loginAction()
        if (authData.value) {
          await this.writeData(authData.value.data)
        }
      } catch {
        if (loginError.value?.data.error.error) {
          this.error = { error: loginError.value?.data.error.error }
        }
      }
    },

    async logoutRequest() {
      const {
        data: logoutData,
        executeApiCall: logoutAction,
        error: logoutError,
      } = useApiCall<UserLogoutResponse, DefaultError, SMSLoginFormPayload>(
        logoutApiCall,
        true,
      )
      this.error = null
      try {
        await logoutAction()
        if (logoutData?.value?.success) {
          await this.clearStore()
        }
      } catch {
        if (logoutError.value?.data.error.error) {
          this.error = { error: logoutError.value?.data.error.error }
        }
      }
    },
  },
})
