import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import { useAuthStore } from '@/store/auth'
import {
  userDataInfoApiCall,
  workShedulePartialChangeApiCall,
  userChangeApiCall,
  deleteUserApiCall,
} from '@/api/user'
import { WorkShedule, UserDataApiResponse, UserData } from '@/types/user'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const errorFields = ref<null | DefaultError['error']>(null)
  const userInfo = ref<UserData | null>(null)
  const selectedItem = ref<WorkShedule | null>(null)
  const authStore = useAuthStore()
  const router = useRouter()

  const setValueByKey = <K extends keyof WorkShedule>(
    key: K,
    value: WorkShedule[K],
  ): void => {
    if (!selectedItem.value && userInfo.value) {
      selectedItem.value = {
        startWorkingTime: userInfo.value?.startWorkingTime,
        endWorkingTime: userInfo.value?.endWorkingTime,
        workingTimeInterval: userInfo.value?.workingTimeInterval,
      }
    }
    ;(selectedItem.value as Record<string, unknown>)[key] = value
  }

  // Валидация заполненных строк в настройках (Настройка рабочего дня)
  const selectedItemValidate = computed(() => {
    if (selectedItem.value === null) {
      return false
    }
    return (
      selectedItem.value.startWorkingTime !== '' &&
      selectedItem.value.endWorkingTime !== '' &&
      selectedItem.value.workingTimeInterval !== null
    )
  })

  const setWorkShedule = (payload: WorkShedule | null) => {
    selectedItem.value = payload
  }

  const {
    data: userInfoData,
    executeApiCall: getUserInfo,
    error: userDataError,
    isLoading: isLoadingUserData,
  } = useApiCall<UserDataApiResponse, DefaultError, UserData>(
    userDataInfoApiCall,
    true,
  )

  const {
    data: changeWorkDayData,
    executeApiCall: changeWorkDay,
    error: userChangeWorkDayError,
  } = useApiCall<UserDataApiResponse, DefaultError, WorkShedule>(
    workShedulePartialChangeApiCall,
    true,
  )

  const {
    data: userChangedData,
    executeApiCall: changeDataUser,
    error: userChangeDataError,
  } = useApiCall<UserDataApiResponse, DefaultError, UserData>(
    userChangeApiCall,
    true,
  )

  const {
    data: userDeleteData,
    executeApiCall: deleteUser,
    error: userDeleteDataError,
  } = useApiCall<UserDataApiResponse, DefaultError, UserData>(
    deleteUserApiCall,
    true,
  )

  const setUserInfo = (payload: UserData) => {
    userInfo.value = payload
  }

  const getUserDataInfo = async () => {
    try {
      await getUserInfo()
      if (userInfoData.value && userInfoData.value.success) {
        setUserInfo(userInfoData.value.data)
      }
    } catch {
      if (userDataError.value?.data.error) {
        errorFields.value = userDataError.value.data.error
      }
    }
  }

  const changeWorkShedule = async () => {
    if (selectedItem.value) {
      try {
        await changeWorkDay(selectedItem.value)
        if (changeWorkDayData.value) {
          setWorkShedule(null)
        }
      } catch {
        if (userChangeWorkDayError.value?.data.error) {
          errorFields.value = userChangeWorkDayError.value.data.error
        }
      }
    }
  }

  const changeDataUserRequest = async (payload: UserData | null) => {
    if (payload) {
      try {
        await changeDataUser(payload)
        if (userChangedData.value) {
          setUserInfo(userChangedData.value.data)
        }
      } catch {
        if (userChangeDataError.value?.data.error) {
          errorFields.value = userChangeDataError.value.data.error
        }
      }
    }
  }

  const deleteUserRequest = async () => {
    try {
      await deleteUser()
      if (userDeleteData.value) {
        if (userDeleteData.value.success) {
          router.push('root')
          authStore.clearStore()
        }
      }
    } catch {
      if (userDeleteDataError.value?.data.error) {
        errorFields.value = userDeleteDataError.value.data.error
      }
    }
  }

  return {
    getUserDataInfo,
    userInfo,
    changeWorkShedule,
    setValueByKey,
    isLoadingUserData,
    selectedItemValidate,
    changeDataUserRequest,
    deleteUserRequest,
  }
})
