import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import {
  AuthoritiesFormPayload,
  AuthoritiesResponse,
  AuthoritiesDataPayload,
} from '@/types/authorities'
import { deleteAuthoritiesApiCall } from '@/api/authorities'

export const useAuthorityStore = defineStore('authority', () => {
  const errorFields = ref<null | DefaultError['error']>(null)
  const statusResponse = ref(false)
  const authoritiesData = ref<AuthoritiesDataPayload | null>(null)

  const {
    data: authorityDeleteData,
    executeApiCall: deleteData,
    error: authorityDeleteError,
  } = useApiCall<AuthoritiesResponse, DefaultError, AuthoritiesFormPayload>(
    deleteAuthoritiesApiCall,
    true,
  )

  const setAuthoritiesData = (payload: AuthoritiesDataPayload) => {
    if (authoritiesData.value) {
      authoritiesData.value = payload
    }
  }

  const setAuthoritiesDataByKey = <K extends keyof AuthoritiesDataPayload>(
    key: K,
    value: AuthoritiesDataPayload[K],
  ) => {
    if (!authoritiesData.value) {
      authoritiesData.value = {} as AuthoritiesDataPayload
    }
    authoritiesData.value[key] = value
  }

  const setCleanData = (): void => {
    const dataToSet: Partial<AuthoritiesDataPayload> = {
      id: null,
      lawsuitNumber: '',
      lawsuitNumberLink: null,
      authority: '',
      judge: '',
      cabinet: '',
      comment: null,
      lawsuitId: null,
    }
    Object.entries(dataToSet).forEach(([key, value]) => {
      setAuthoritiesDataByKey(key as keyof AuthoritiesDataPayload, value)
    })
  }

  const deleteAuthorityItem = async (payload: AuthoritiesFormPayload) => {
    try {
      await deleteData(payload)
      if (authorityDeleteData.value) {
        statusResponse.value = authorityDeleteData.value.success
        if (authorityDeleteData.value.success) {
          console.log(authorityDeleteData.value)
        }
      }
    } catch {
      if (authorityDeleteError.value?.data.error) {
        errorFields.value = authorityDeleteError.value.data.error
      }
    }
  }

  return {
    deleteAuthorityItem,
    authoritiesData,
    setAuthoritiesData,
    setAuthoritiesDataByKey,
    setCleanData,
  }
})
