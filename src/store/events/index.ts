import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import {
  eventChangeStatusApiCall,
  eventPartialChangeApiCall,
  deleteEventApiCall,
  eventsTypesListApiCall,
  deleteEventsTypeApiCall,
  eventsTypeChangeApiCall,
  eventsTypeCreateApiCall,
} from '@/api/events'
import {
  EventChangeForm,
  EventChangeFormResponse,
  EventPartialChangeForm,
  EventsTypesResponse,
  EventCategory,
  EventsTypesChangeResponse,
} from '@/types/events'

export const useEventsStore = defineStore('events', () => {
  const errorFields = ref<null | DefaultError['error']>(null)
  const changeStatusResponse = ref(false)
  const partialChangeStatusResponse = ref(false)
  const createEventsTypeStatus = ref(false)

  // Формирование данных для настроек
  const eventsTypes = ref<EventCategory[] | null>(null)
  const arrayOfEventsTypes = ref<EventCategory[] | null>([])

  const {
    data: changeEventData,
    executeApiCall: setEventStatus,
    error: eventError,
  } = useApiCall<EventChangeFormResponse, DefaultError, EventChangeForm>(
    eventChangeStatusApiCall,
    true,
  )

  const {
    data: partialChangeEventData,
    executeApiCall: setEventPartialChange,
    error: partialEventError,
  } = useApiCall<EventChangeFormResponse, DefaultError, EventPartialChangeForm>(
    eventPartialChangeApiCall,
    true,
  )

  const {
    data: deleteEventData,
    executeApiCall: setDeleteData,
    error: deleteEventError,
  } = useApiCall<EventChangeFormResponse, DefaultError, EventPartialChangeForm>(
    deleteEventApiCall,
    true,
  )

  const {
    data: eventsTypesData,
    executeApiCall: getEventsTypesData,
    error: eventsTypesError,
  } = useApiCall<EventsTypesResponse, DefaultError, EventPartialChangeForm>(
    eventsTypesListApiCall,
    true,
  )

  const {
    data: deleteEventsType,
    executeApiCall: setDeleteEventsType,
    error: deleteEventTypeError,
  } = useApiCall<EventsTypesResponse, DefaultError, EventPartialChangeForm>(
    deleteEventsTypeApiCall,
    true,
  )

  const {
    data: editEventsType,
    executeApiCall: setEditEventsType,
    error: editEventTypeError,
  } = useApiCall<EventsTypesChangeResponse, DefaultError, EventCategory>(
    eventsTypeChangeApiCall,
    true,
  )

  const {
    data: createEventsType,
    executeApiCall: setCreateEventsType,
    error: createEventTypeError,
  } = useApiCall<EventsTypesChangeResponse, DefaultError, EventCategory>(
    eventsTypeCreateApiCall,
    true,
  )

  const setStatusResponse = (): void => {
    changeStatusResponse.value = !changeStatusResponse.value
  }

  const setPartialChangeStatusResponse = (): void => {
    partialChangeStatusResponse.value = !partialChangeStatusResponse.value
  }

  const setEventsTypes = (payload: EventCategory[] | null): void => {
    eventsTypes.value = payload
  }

  // Включение/отключение кнопки создания нового типа
  const setCreateEventsTypeStatus = (payload: boolean): void => {
    createEventsTypeStatus.value = payload
  }

  const setEmptyEventsType = (): void => {
    const emptyEventType: EventCategory = {
      id: null,
      name: '',
      color: '',
      isBillable: false,
      notifyBeforeHours: null,
      markBeforeDays: null,
      createdAt: null,
      updatedAt: null,
      type: null,
    }
    if (eventsTypes.value) {
      eventsTypes.value.push(emptyEventType)
    } else {
      eventsTypes.value = [emptyEventType]
    }
    setCreateEventsTypeStatus(true)
  }

  // Формирование массива с измененными объектами
  const saveEventsTypesObject = (newObject: EventCategory): void => {
    if (arrayOfEventsTypes.value) {
      const index = arrayOfEventsTypes.value.findIndex(
        (item) => item.id === newObject.id,
      )
      if (index !== -1) {
        arrayOfEventsTypes.value[index] = {
          ...arrayOfEventsTypes.value[index],
          ...newObject,
        }
      } else {
        arrayOfEventsTypes.value.push(newObject)
      }
    }
  }

  const removeEventsType = (eventToRemove: EventPartialChangeForm) => {
    if (eventsTypes.value) {
      eventsTypes.value = eventsTypes.value.filter(
        (object) => object.id !== eventToRemove.id,
      )
    }
  }

  const processArrayObjects = async () => {
    if (Array.isArray(arrayOfEventsTypes.value)) {
      for (const item of arrayOfEventsTypes.value) {
        if (typeof item === 'object' && item !== null && 'id' in item) {
          if (item.id !== null) {
            await setChangeEventsTypeById(item)
          } else {
            await cteateEventsTypeObject(item)
          }
        }
      }
    }
    arrayOfEventsTypes.value = []
  }

  const setEventsStatus = async (payload: EventChangeForm) => {
    try {
      await setEventStatus(payload)
      if (changeEventData.value) {
        setStatusResponse()
      }
    } catch {
      if (eventError.value?.data.error) {
        errorFields.value = eventError.value.data.error
      }
    }
  }

  const setPartialEventsChange = async (payload: EventPartialChangeForm) => {
    try {
      await setEventPartialChange(payload)
      if (
        partialChangeEventData.value &&
        partialChangeEventData.value.success
      ) {
        setPartialChangeStatusResponse()
      }
    } catch {
      if (partialEventError.value?.data.error) {
        errorFields.value = partialEventError.value.data.error
      }
    }
  }

  const setDeleteEvent = async (payload: EventPartialChangeForm) => {
    try {
      await setDeleteData(payload)
      if (deleteEventData.value && deleteEventData.value.success) {
        setStatusResponse()
      }
    } catch {
      if (deleteEventError.value?.data.error) {
        errorFields.value = deleteEventError.value.data.error
      }
    }
  }

  const getEventsTypes = async () => {
    try {
      await getEventsTypesData()
      if (eventsTypesData.value && eventsTypesData.value.success) {
        setEventsTypes(eventsTypesData.value.data)
      }
    } catch {
      if (eventsTypesError.value?.data.error) {
        errorFields.value = eventsTypesError.value.data.error
      }
    }
  }

  const setDeleteEventsTypeById = async (payload: EventPartialChangeForm) => {
    if (payload && payload.id !== null) {
      try {
        await setDeleteEventsType(payload)
        if (deleteEventsType.value && deleteEventsType.value.success) {
          removeEventsType(payload)
        }
      } catch {
        if (deleteEventTypeError.value?.data.error) {
          errorFields.value = deleteEventTypeError.value.data.error
        }
      }
    } else {
      removeEventsType(payload)
      setCreateEventsTypeStatus(false)
    }
  }

  const setChangeEventsTypeById = async (payload: EventCategory | null) => {
    if (payload) {
      try {
        await setEditEventsType(payload)
        if (editEventsType.value && editEventsType.value.success) {
          console.log(editEventsType.value)
        }
      } catch {
        if (editEventTypeError.value?.data.error) {
          errorFields.value = editEventTypeError.value.data.error
        }
      }
    }
  }

  const cteateEventsTypeObject = async (payload: EventCategory) => {
    try {
      await setCreateEventsType(payload)
      if (createEventsType.value && createEventsType.value.success) {
        setCreateEventsTypeStatus(false)
      }
    } catch {
      if (createEventTypeError.value?.data.error) {
        errorFields.value = createEventTypeError.value.data.error
      }
    }
  }

  return {
    setEventsStatus,
    changeStatusResponse,
    setStatusResponse,
    setPartialEventsChange,
    partialChangeStatusResponse,
    setPartialChangeStatusResponse,
    setDeleteEvent,
    eventsTypes,
    getEventsTypes,
    setEventsTypes,
    setDeleteEventsTypeById,
    setChangeEventsTypeById,
    saveEventsTypesObject,
    processArrayObjects,
    arrayOfEventsTypes,
    setEmptyEventsType,
    setCreateEventsTypeStatus,
    createEventsTypeStatus,
    cteateEventsTypeObject,
    removeEventsType,
  }
})
