import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import {
  taskChangeStatusApiCall,
  taskPartialChangeApiCall,
  deleteTaskApiCall,
  getTagsForTasksApiCall,
  createTagForTaskApiCall,
  editTagForTaskApiCall,
  deleteTagForTaskApiCall,
} from '@/api/tasks'
import {
  TaskChangeForm,
  TaskChangeFormResponse,
  TaskPartialChangeForm,
  TagForTaskResponse,
  TagForTasksResponse,
  TagForTasksForm,
  TagForTasks,
} from '@/types/tasks'

export const useTasksStore = defineStore('tasks', () => {
  const errorFields = ref<null | DefaultError['error']>(null)
  const changeStatusResponse = ref(false)
  const partialChangeStatusResponse = ref(false)
  const tagsList = ref<TagForTasks[] | null>(null)
  const arrayOfTags = ref<TagForTasks[] | null>([])
  const createTagsForTasksStatus = ref(false)

  // Включение/отключение кнопки создания нового типа
  const setCreateTagsForTasksStatus = (payload: boolean): void => {
    createTagsForTasksStatus.value = payload
  }

  const setEmptyTag = (): void => {
    const emptyTag: TagForTasks = {
      id: null,
      name: '',
      color: '',
      createdAt: null,
      updatedAt: null,
    }
    if (tagsList.value) {
      tagsList.value.push(emptyTag)
    } else {
      tagsList.value = [emptyTag]
    }
    setCreateTagsForTasksStatus(true)
  }

  // Формирование массива с измененными объектами
  const saveTagObject = (newObject: TagForTasks): void => {
    if (arrayOfTags.value) {
      const index = arrayOfTags.value.findIndex(
        (item) => item.id === newObject.id,
      )
      if (index !== -1) {
        arrayOfTags.value[index] = { ...arrayOfTags.value[index], ...newObject }
      } else {
        arrayOfTags.value.push(newObject)
      }
    }
  }

  const processArrayObjects = async () => {
    if (Array.isArray(arrayOfTags.value)) {
      for (const item of arrayOfTags.value) {
        if (typeof item === 'object' && item !== null && 'id' in item) {
          if (item.id !== null) {
            editTagsForTasks(item)
          } else {
            await createTagsForTasks(item)
          }
        }
      }
    }
    arrayOfTags.value = []
  }

  const replaceLastItem = (newItem: TagForTasks) => {
    if (tagsList.value && tagsList.value.length > 0) {
      tagsList.value[tagsList.value.length - 1] = newItem
    }
  }

  const {
    data: changeTaskData,
    executeApiCall: setTaskStatus,
    error: taskError,
  } = useApiCall<TaskChangeFormResponse, DefaultError, TaskChangeForm>(
    taskChangeStatusApiCall,
    true,
  )

  const {
    data: partialChangeTaskData,
    executeApiCall: setTaskPartialChange,
    error: partialTaskError,
  } = useApiCall<TaskChangeFormResponse, DefaultError, TaskPartialChangeForm>(
    taskPartialChangeApiCall,
    true,
  )

  const {
    data: deleteTaskData,
    executeApiCall: setDeleteData,
    error: deleteTaskError,
  } = useApiCall<TaskChangeFormResponse, DefaultError, TaskPartialChangeForm>(
    deleteTaskApiCall,
    true,
  )

  const {
    data: tagsForTasksData,
    executeApiCall: getTagsForTasksData,
    error: tagsForTasksError,
  } = useApiCall<TagForTasksResponse, DefaultError, TagForTasksForm>(
    getTagsForTasksApiCall,
    true,
  )

  const {
    data: createTagsForTasksData,
    executeApiCall: createTagsData,
    error: createTagError,
  } = useApiCall<TagForTaskResponse, DefaultError, TagForTasks>(
    createTagForTaskApiCall,
    true,
  )

  const {
    data: editTagsForTasksData,
    executeApiCall: editTagsData,
    error: editTagError,
  } = useApiCall<TagForTaskResponse, DefaultError, TagForTasks>(
    editTagForTaskApiCall,
    true,
  )

  const {
    data: deleteTagsForTasksData,
    executeApiCall: deleteTagsData,
    error: deleteTagError,
  } = useApiCall<TagForTaskResponse, DefaultError, TagForTasksForm>(
    deleteTagForTaskApiCall,
    true,
  )

  const setStatusResponse = () => {
    changeStatusResponse.value = !changeStatusResponse.value
  }

  const setPartialChangeStatusResponse = () => {
    partialChangeStatusResponse.value = !partialChangeStatusResponse.value
  }
  const setTagList = (payload: TagForTasks[]) => {
    tagsList.value = payload
  }

  const removeTaskFromList = (objectToRemove: TagForTasksForm) => {
    if (tagsList.value) {
      tagsList.value = tagsList.value.filter(
        (object) => object.id !== objectToRemove.id,
      )
    }
  }

  const setTasksStatus = async (payload: TaskChangeForm) => {
    try {
      await setTaskStatus(payload)
      if (changeTaskData.value && changeTaskData.value.success) {
        setStatusResponse()
      }
    } catch {
      if (taskError.value?.data.error) {
        errorFields.value = taskError.value.data.error
      }
    }
  }

  const setPartialTasksChange = async (payload: TaskPartialChangeForm) => {
    try {
      await setTaskPartialChange(payload)
      if (partialChangeTaskData.value && partialChangeTaskData.value.success) {
        setPartialChangeStatusResponse()
      }
    } catch {
      if (partialTaskError.value?.data.error) {
        errorFields.value = partialTaskError.value.data.error
      }
    }
  }

  const setDeleteTask = async (payload: TaskPartialChangeForm) => {
    try {
      await setDeleteData(payload)
      if (deleteTaskData.value && deleteTaskData.value.success) {
        setStatusResponse()
      }
    } catch {
      if (deleteTaskError.value?.data.error) {
        errorFields.value = deleteTaskError.value.data.error
      }
    }
  }

  const getTagsForTasksList = async () => {
    try {
      await getTagsForTasksData()
      if (tagsForTasksData.value) {
        setTagList(tagsForTasksData.value.data)
      }
    } catch {
      if (tagsForTasksError.value?.data.error) {
        errorFields.value = tagsForTasksError.value.data.error
      }
    }
  }

  const createTagsForTasks = async (payload: TagForTasks) => {
    try {
      await createTagsData(payload)
      if (
        createTagsForTasksData.value &&
        createTagsForTasksData.value.success
      ) {
        setCreateTagsForTasksStatus(false)
        replaceLastItem(createTagsForTasksData.value.data)
      }
    } catch {
      if (createTagError.value?.data.error) {
        errorFields.value = createTagError.value.data.error
      }
    }
  }

  const editTagsForTasks = async (payload: TagForTasks) => {
    try {
      await editTagsData(payload)
      if (editTagsForTasksData.value && editTagsForTasksData.value.success) {
        setCreateTagsForTasksStatus(false)
        console.log(editTagsForTasksData.value)
      }
    } catch {
      if (editTagError.value?.data.error) {
        errorFields.value = editTagError.value.data.error
      }
    }
  }

  // TagForTasks
  const deleteTagsForTasks = async (payload: TagForTasksForm) => {
    if (payload && payload.id) {
      try {
        await deleteTagsData(payload)
        if (
          deleteTagsForTasksData.value &&
          deleteTagsForTasksData.value.success
        ) {
          if (payload) {
            removeTaskFromList(payload)
          }
        }
      } catch {
        if (deleteTagError.value?.data.error) {
          errorFields.value = deleteTagError.value.data.error
        }
      }
    } else if (payload && payload.id === null) {
      removeTaskFromList(payload)
      setCreateTagsForTasksStatus(false)
    }
  }

  return {
    setTasksStatus,
    changeStatusResponse,
    setStatusResponse,
    setPartialTasksChange,
    partialChangeStatusResponse,
    setPartialChangeStatusResponse,
    setDeleteTask,
    getTagsForTasksList,
    tagsList,
    setTagList,
    createTagsForTasks,
    createTagsForTasksStatus,
    setCreateTagsForTasksStatus,
    setEmptyTag,
    saveTagObject,
    processArrayObjects,
    deleteTagsForTasks,
    arrayOfTags,
  }
})
