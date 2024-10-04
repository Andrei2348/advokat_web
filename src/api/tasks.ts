import axios from 'axios'
import {
  TaskChangeForm,
  TaskChangeFormResponse,
  TaskPartialChangeForm,
  TagForTaskResponse,
  TagForTasksResponse,
  TagForTasksForm,
  TagForTasks,
} from '@/types/tasks'

const taskChangeStatusApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskChangeForm>,
): Promise<TaskChangeFormResponse> => {
  const response = await axios.post(
    `/v1/task/${params?.id}/status`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const taskPartialChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskPartialChangeForm>,
): Promise<TaskChangeFormResponse> => {
  const response = await axios.patch(
    `/v1/task/${params?.id}/partial-update`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskPartialChangeForm>,
): Promise<TaskChangeFormResponse> => {
  const response = await axios.delete(`/v1/task/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

const getTagsForTasksApiCall = async (
  abortController?: AbortController,
  params?: Partial<TagForTasksForm>,
): Promise<TagForTasksResponse> => {
  const response = await axios.get('/v1/task-tag', {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const createTagForTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TagForTasks>,
): Promise<TagForTaskResponse> => {
  const response = await axios.post(
    '/v1/task-tag',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const editTagForTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TagForTasks>,
): Promise<TagForTaskResponse> => {
  const response = await axios.put(
    `/v1/task-tag/${params?.id}`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteTagForTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TagForTasks>,
): Promise<TagForTaskResponse> => {
  const response = await axios.delete(`/v1/task-tag/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

export {
  taskChangeStatusApiCall,
  taskPartialChangeApiCall,
  deleteTaskApiCall,
  getTagsForTasksApiCall,
  createTagForTaskApiCall,
  editTagForTaskApiCall,
  deleteTagForTaskApiCall,
}
