import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import { useUXUIStore } from '@/store/uxui'
import {
  LawsuitForm,
  LawsuitFormPayload,
  LawsuitPartialFormObject,
  LawsuitFormSuccessResponse,
  LawsuitFormObject,
  TaskEvent,
  TaskEventResponse,
  LawsuitCategory,
  LawsuitCategoryResponseData,
} from '@/types/lawsuit'
import {
  lawsuitChangeApiCall,
  lawsuitCreateApiCall,
  lawsuitEventsApiCall,
  deleteLawsuitApiCall,
  lawsuitPartialChangeApiCall,
  lawsuitCategoryesListApiCall,
  createLawsuitCategoryesApiCall,
  editLawsuitCategoryApiCall,
  deleteLawsuitCategoryApiCall,
} from '@/api/lawsuit'

export const useLawsuitStore = defineStore('lawsuit', () => {
  const lawsuitData = ref<LawsuitForm[] | null>(null)
  const statusResponse = ref(false)
  const errorFields = ref<null | DefaultError['error']>(null)
  const lawsuitEvents = ref<TaskEvent[] | null>(null)
  const uxuiStore = useUXUIStore()
  const createLawsuitCategoryStatus = ref(false)

  // Формирование данных для настроек
  const lawsuitCategories = ref<LawsuitCategory[] | null>(null)
  const arrayOfLawsuitCategories = ref<LawsuitCategory[] | null>([])

  const setLawsuitCategories = (payload: LawsuitCategory[] | null): void => {
    lawsuitCategories.value = payload
  }

  // Дело для отправки запроса на изменение или создание
  const selectedLawsuitData = ref<LawsuitFormObject | null>(
    {} as LawsuitFormObject,
  )

  // Дело для отображения на странице
  const selectedLawsuit = ref<LawsuitForm | null>(null)

  const setLawsuitData = (payload: LawsuitForm[] | null): void => {
    lawsuitData.value = payload
  }

  // Заполнение объекта по ключу и значению
  const setSelectedLawsuitData = (
    key: string,
    value: number | string | null,
  ): void => {
    if (selectedLawsuitData.value) {
      selectedLawsuitData.value[key] = value
    }
  }

  // Заполнение объекта целиком
  const setSelectedLawsuitDataObject = (
    payload: LawsuitFormObject | null,
  ): void => {
    selectedLawsuitData.value = payload
  }

  const setSelectedLawsuit = (payload: LawsuitForm | null): void => {
    selectedLawsuit.value = payload
  }

  const setLawsuitEvents = (payload: TaskEvent[] | null): void => {
    lawsuitEvents.value = payload
  }

  // Включение/отключение кнопки создания нового типа
  const setCreateLawsuitCategoryStatus = (payload: boolean): void => {
    createLawsuitCategoryStatus.value = payload
  }

  // Формирование массива с измененными объектами
  const saveLawsuitCategoryObject = (newObject: LawsuitCategory): void => {
    if (arrayOfLawsuitCategories.value) {
      const index = arrayOfLawsuitCategories.value.findIndex(
        (item) => item.id === newObject.id,
      )
      if (index !== -1) {
        arrayOfLawsuitCategories.value[index] = {
          ...arrayOfLawsuitCategories.value[index],
          ...newObject,
        }
      } else {
        arrayOfLawsuitCategories.value.push(newObject)
      }
    }
  }

  const {
    data: lawsuitDeleteData,
    executeApiCall: deleteData,
    error: lawsuitDeleteError,
    isLoading: isDeleteLoading,
  } = useApiCall<LawsuitFormSuccessResponse, DefaultError, LawsuitFormPayload>(
    deleteLawsuitApiCall,
    true,
  )

  const {
    data: lawsuitPartialData,
    executeApiCall: sendPartialData,
    error: lawsuitError,
  } = useApiCall<
    LawsuitFormSuccessResponse,
    DefaultError,
    LawsuitPartialFormObject
  >(lawsuitPartialChangeApiCall, true)

  const {
    data: lawsuitChangedData,
    executeApiCall: sendData,
    error: lawsuitChangedError,
  } = useApiCall<LawsuitFormSuccessResponse, DefaultError, LawsuitFormObject>(
    lawsuitChangeApiCall,
    true,
  )

  const {
    data: lawsuitCreateData,
    executeApiCall: createData,
    error: lawsuitCreateError,
  } = useApiCall<LawsuitFormSuccessResponse, DefaultError, LawsuitFormObject>(
    lawsuitCreateApiCall,
    true,
  )

  const {
    data: lawyerEventsData,
    executeApiCall: getEvents,
    error: lawyerEventsError,
  } = useApiCall<TaskEventResponse, DefaultError, LawsuitFormPayload>(
    lawsuitEventsApiCall,
    true,
  )

  const {
    data: lawsuitCategoriesData,
    executeApiCall: getLawsuitCategories,
    error: lawsuitCategoriesError,
  } = useApiCall<LawsuitCategoryResponseData, DefaultError, LawsuitFormPayload>(
    lawsuitCategoryesListApiCall,
    true,
  )

  const {
    data: createdLawsuitCategoriesData,
    executeApiCall: createLawsuitCategories,
    error: lawsuitCreateCategoriesError,
  } = useApiCall<LawsuitCategoryResponseData, DefaultError, LawsuitCategory>(
    createLawsuitCategoryesApiCall,
    true,
  )

  const {
    data: editLawsuitCategoriesData,
    executeApiCall: editLawsuitCategories,
    error: lawsuitEditCategoriesError,
  } = useApiCall<LawsuitCategoryResponseData, DefaultError, LawsuitCategory>(
    editLawsuitCategoryApiCall,
    true,
  )

  const {
    data: deleteLawsuitCategoriesData,
    executeApiCall: deleteCategory,
    error: lawsuitDeleteCategoriesError,
  } = useApiCall<LawsuitCategoryResponseData, DefaultError, LawsuitFormPayload>(
    deleteLawsuitCategoryApiCall,
    true,
  )

  const isLawsuitDeleteLoading = computed(() => isDeleteLoading.value)
  const isLawsuitData = computed(() => lawsuitData.value)

  const changeLawsuitList = (changedObject: LawsuitForm) => {
    if (!lawsuitData.value) {
      lawsuitData.value = []
    }
    const existingObjectIndex = lawsuitData.value.findIndex(
      (obj) => obj.id === changedObject.id,
    )
    if (existingObjectIndex !== -1) {
      const existingObject = lawsuitData.value[existingObjectIndex]
      lawsuitData.value[existingObjectIndex] = {
        ...existingObject,
        ...changedObject,
      }
    } else {
      lawsuitData.value.push(changedObject)
    }
  }

  const deleteLawsuit = (idToRemove: number): void => {
    if (lawsuitData.value) {
      lawsuitData.value = lawsuitData.value.filter(
        (item: LawsuitForm) => item.id !== idToRemove,
      )
    }
  }

  const removeLawsuitCategory = (objectToRemove: LawsuitFormPayload) => {
    if (lawsuitCategories.value) {
      lawsuitCategories.value = lawsuitCategories.value.filter(
        (object) => object.id !== objectToRemove.id,
      )
    }
  }

  const setEmptyLawsuitCategory = (): void => {
    const emptyLawsuitCategory: LawsuitCategory = {
      id: null,
      name: '',
      color: '',
      notifyBeforeHours: null,
      markBeforeDays: null,
      createdAt: null,
      updatedAt: null,
    }
    if (lawsuitCategories.value) {
      lawsuitCategories.value.push(emptyLawsuitCategory)
    } else {
      lawsuitCategories.value = [emptyLawsuitCategory]
    }
    setCreateLawsuitCategoryStatus(true)
  }

  const processArrayObjects = async () => {
    if (Array.isArray(arrayOfLawsuitCategories.value)) {
      for (const item of arrayOfLawsuitCategories.value) {
        if (typeof item === 'object' && item !== null && 'id' in item) {
          if (item.id !== null) {
            await editLawsuitCategoriesObject(item)
          } else {
            await createLawsuitCategoriesObject(item)
          }
        }
      }
    }
    arrayOfLawsuitCategories.value = []
  }

  const deletelawsuitItem = async (payload: LawsuitFormPayload) => {
    if (payload && payload.id) {
      try {
        await deleteData(payload)
        if (lawsuitDeleteData.value) {
          statusResponse.value = lawsuitDeleteData.value.success
          if (lawsuitDeleteData.value.success) {
            deleteLawsuit(payload.id)
          }
        }
      } catch {
        if (lawsuitDeleteError.value?.data.error) {
          errorFields.value = lawsuitDeleteError.value.data.error
        }
      }
    }
  }

  const setChangeLawsuit = async () => {
    try {
      if (selectedLawsuitData.value) {
        await sendData(selectedLawsuitData.value)
        if (lawsuitChangedData.value && lawsuitChangedData.value.success) {
          changeLawsuitList(lawsuitChangedData.value.data)
          uxuiStore.setModalName('')
        }
      }
    } catch {
      if (lawsuitChangedError.value?.data.error) {
        errorFields.value = lawsuitChangedError.value.data.error
      }
    }
  }

  const setCreateLawsuit = async () => {
    try {
      if (selectedLawsuitData.value) {
        await createData(selectedLawsuitData.value)
        if (lawsuitCreateData.value && lawsuitCreateData.value.success) {
          changeLawsuitList(lawsuitCreateData.value.data)
          uxuiStore.setModalName('')
        }
      }
    } catch {
      if (lawsuitCreateError.value?.data.error) {
        errorFields.value = lawsuitCreateError.value.data.error
      }
    }
  }

  const getLawsuitEvents = async (payload: LawsuitFormPayload) => {
    try {
      await getEvents(payload)
      if (lawyerEventsData.value) {
        setLawsuitEvents(lawyerEventsData.value.data)
      }
    } catch {
      if (lawyerEventsError.value?.data.error) {
        errorFields.value = lawyerEventsError.value.data.error
      }
    }
  }

  const setPartialChangeLawsuit = async (payload: LawsuitPartialFormObject) => {
    try {
      await sendPartialData(payload)
      if (lawsuitPartialData.value) {
        changeLawsuitList(lawsuitPartialData.value.data)
      }
    } catch {
      if (lawsuitError.value?.data.error) {
        errorFields.value = lawsuitError.value.data.error
      }
    }
  }

  const getLawsuitCategoriesList = async () => {
    try {
      await getLawsuitCategories()
      if (lawsuitCategoriesData.value && lawsuitCategoriesData.value.success) {
        setLawsuitCategories(lawsuitCategoriesData.value.data)
      }
    } catch {
      if (lawsuitCategoriesError.value?.data.error) {
        errorFields.value = lawsuitCategoriesError.value.data.error
      }
    }
  }

  const createLawsuitCategoriesObject = async (
    payload: LawsuitCategory | null,
  ) => {
    if (payload) {
      try {
        await createLawsuitCategories(payload)
        if (
          createdLawsuitCategoriesData.value &&
          createdLawsuitCategoriesData.value.success
        ) {
          setCreateLawsuitCategoryStatus(false)
        }
      } catch {
        if (lawsuitCreateCategoriesError.value?.data.error) {
          errorFields.value = lawsuitCreateCategoriesError.value.data.error
        }
      }
    }
  }

  const editLawsuitCategoriesObject = async (
    payload: LawsuitCategory | null,
  ) => {
    if (payload) {
      try {
        await editLawsuitCategories(payload)
        if (
          editLawsuitCategoriesData.value &&
          editLawsuitCategoriesData.value.success
        ) {
          console.log(editLawsuitCategoriesData.value)
        }
      } catch {
        if (lawsuitEditCategoriesError.value?.data.error) {
          errorFields.value = lawsuitEditCategoriesError.value.data.error
        }
      }
    }
  }

  const deleteLawsuitCategory = async (payload: LawsuitFormPayload) => {
    if (payload && payload.id) {
      try {
        await deleteCategory(payload)
        if (deleteLawsuitCategoriesData.value?.success) {
          if (payload) {
            removeLawsuitCategory(payload)
          }
        }
      } catch {
        if (lawsuitDeleteCategoriesError.value?.data.error) {
          errorFields.value = lawsuitDeleteCategoriesError.value.data.error
        }
      }
      // Если категория на стадии создания и ее нет в БД
    } else {
      removeLawsuitCategory(payload)
      setCreateLawsuitCategoryStatus(false)
    }
  }

  return {
    lawsuitData,
    isLawsuitData,
    setLawsuitData,
    isLawsuitDeleteLoading,
    deletelawsuitItem,
    changeLawsuitList,
    selectedLawsuitData,
    setSelectedLawsuitData,
    deleteLawsuit,
    setPartialChangeLawsuit,
    setChangeLawsuit,
    selectedLawsuit,
    setSelectedLawsuit,
    setCreateLawsuit,
    setSelectedLawsuitDataObject,
    lawsuitEvents,
    setLawsuitEvents,
    getLawsuitEvents,
    getLawsuitCategoriesList,
    lawsuitCategories,
    setEmptyLawsuitCategory,
    createLawsuitCategoryStatus,
    setCreateLawsuitCategoryStatus,
    createLawsuitCategoryesApiCall,
    editLawsuitCategoryApiCall,
    createLawsuitCategoriesObject,
    editLawsuitCategoriesObject,
    processArrayObjects,
    arrayOfLawsuitCategories,
    saveLawsuitCategoryObject,
    deleteLawsuitCategory,
  }
})
