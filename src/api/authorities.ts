import axios from 'axios'
import {
  AuthoritiesFormPayload,
  AuthoritiesResponse,
  AuthoritiesDataResponse,
  AuthoritiesDataPayload,
} from '@/types/authorities'

const authoritiesApiCall = async (
  abortController?: AbortController,
  params?: Partial<AuthoritiesFormPayload>,
): Promise<AuthoritiesResponse> => {
  const response = await axios.get(`/v1/lawsuit/${params?.id}/authorities`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const deleteAuthoritiesApiCall = async (
  abortController?: AbortController,
  params?: Partial<AuthoritiesFormPayload>,
): Promise<AuthoritiesResponse> => {
  const response = await axios.delete(`/v1/authority/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

const authoritiesCreateApiCall = async (
  abortController?: AbortController,
  params?: Partial<AuthoritiesDataPayload>,
): Promise<AuthoritiesDataResponse> => {
  const response = await axios.post(
    '/v1/authority',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const authoritiesChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<AuthoritiesDataPayload>,
): Promise<AuthoritiesDataResponse> => {
  const response = await axios.put(
    `/v1/authority/${params?.id}`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

export {
  authoritiesApiCall,
  deleteAuthoritiesApiCall,
  authoritiesCreateApiCall,
  authoritiesChangeApiCall,
}
