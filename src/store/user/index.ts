import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import {
  userDataInfoApiCall,
  workShedulePartialChangeApiCall,
} from '@/api/user'
import { WorkShedule, UserData, UserDataApiResponse } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const errorFields = ref<null | DefaultError['error']>(null)
  const userInfo = ref<UserData | null>(null)
  const selectedItem = ref<WorkShedule | null>(null)

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

  const setUserInfo = (payload: UserData) => {
    userInfo.value = payload
  }

  const getUserDataInfo = async () => {
    try {
      await getUserInfo()
      if (userInfoData.value && userInfoData.value.success) {
        setUserInfo(userInfoData.value.data)
        console.log(userInfoData.value.data)
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

  return {
    getUserDataInfo,
    userInfo,
    changeWorkShedule,
    setValueByKey,
    isLoadingUserData,
    selectedItemValidate,
  }
})
