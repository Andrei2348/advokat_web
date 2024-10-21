import axios from 'axios'
import {
  TaskStatusChangePayload,
  TaskPartialChangePayload,
  TaskCreatePayload,
  TaskChangePayload,
  TaskSearchPayload,
  TaskSearchData,
  TaskResponse,
  TagForTaskResponse,
  TagForTasksResponse,
  TagForTasksForm,
  Task,
  TagForTasks,
} from '@/types/tasks'

export const getTasksApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskSearchPayload>,
): Promise<TaskSearchData> => {
  const response = await axios.post(
    '/v1/task/search',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

export const createTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskCreatePayload>,
): Promise<TaskResponse<Task>> => {
  const response = await axios.post(
    '/v1/task',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const taskChangeStatusApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskStatusChangePayload>,
): Promise<TaskResponse<Task>> => {
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
  params?: Partial<TaskPartialChangePayload>,
): Promise<TaskResponse<Task>> => {
  const response = await axios.patch(
    `/v1/task/${params?.id}/partial-update`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

export const changeTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskChangePayload>,
) => {
  const response = await axios.put(
    `/v1/task/${params?.id}`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteTaskApiCall = async (
  abortController?: AbortController,
  params?: Partial<TaskPartialChangePayload>,
): Promise<TaskResponse<''>> => {
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
