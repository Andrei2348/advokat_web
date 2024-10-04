import axios from 'axios'
import { UserData, UserDataApiResponse, WorkShedule } from '@/types/user'

const userDataInfoApiCall = async (
  abortController?: AbortController,
  params?: Partial<UserData>,
): Promise<UserDataApiResponse> => {
  const response = await axios.get('/v1/me', {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const workShedulePartialChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<WorkShedule>,
): Promise<UserDataApiResponse> => {
  const response = await axios.patch(
    'v1/user/work-day',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const userChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<UserData>,
): Promise<UserDataApiResponse> => {
  const response = await axios.put(
    'v1/user',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteUserApiCall = async (
  abortController?: AbortController,
): Promise<UserDataApiResponse> => {
  const response = await axios.delete('/v1/user', {
    signal: abortController?.signal,
  })
  return response.data
}

export {
  userDataInfoApiCall,
  workShedulePartialChangeApiCall,
  userChangeApiCall,
  deleteUserApiCall,
}
