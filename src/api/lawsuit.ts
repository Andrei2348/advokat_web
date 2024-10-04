import axios from 'axios'
import {
  LawsuitFormObject,
  LawsuitFormPayload,
  LawsuitFormSuccessResponse,
  LawsuitsFormSuccessResponse,
  LawsuitPartialFormObject,
  TaskEventResponse,
  FormObjectRequest,
  LawsuitFormActSuccessResponse,
  LawsuitCategoryResponseData,
  LawsuitCategory,
} from '@/types/lawsuit'

const lawsuitApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormPayload>,
): Promise<LawsuitsFormSuccessResponse> => {
  const response = await axios.post(
    '/v1/lawsuit/search',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteLawsuitApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormPayload>,
): Promise<LawsuitFormSuccessResponse> => {
  const response = await axios.delete(`/v1/lawsuit/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

const lawsuitChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormObject>,
): Promise<LawsuitFormSuccessResponse> => {
  const response = await axios.put(
    `/v1/lawsuit/${params?.id}`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const lawsuitPartialChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitPartialFormObject>,
): Promise<LawsuitFormSuccessResponse> => {
  let id: number | null | undefined
  if (params) {
    id = params.id
    delete params.id
  }
  const response = await axios.patch(
    `/v1/lawsuit/${id}/partial-update`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const lawsuitCreateApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormObject>,
): Promise<LawsuitFormSuccessResponse> => {
  const response = await axios.post(
    '/v1/lawsuit',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const lawsuitDetailsApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormPayload>,
): Promise<LawsuitFormSuccessResponse> => {
  const response = await axios.get(`/v1/lawsuit/${params?.id}`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const lawsuitEventsApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormPayload>,
): Promise<TaskEventResponse> => {
  const response = await axios.get(`/v1/lawsuit/${params?.id}/events`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const lawsuitGetReportApiCall = async (
  abortController?: AbortController,
  params?: Partial<FormObjectRequest>,
): Promise<LawsuitFormActSuccessResponse> => {
  const response = await axios.post(
    `/v1/lawsuit/${params?.id}/report`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const lawsuitCategoryesListApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitFormPayload>,
): Promise<LawsuitCategoryResponseData> => {
  const response = await axios.get('/v1/lawsuit-category', {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const createLawsuitCategoryesApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitCategory>,
): Promise<LawsuitCategoryResponseData> => {
  const response = await axios.post(
    `/v1/lawsuit-category`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const editLawsuitCategoryApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitCategory>,
): Promise<LawsuitCategoryResponseData> => {
  const response = await axios.put(
    `/v1/lawsuit-category/${params?.id}`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteLawsuitCategoryApiCall = async (
  abortController?: AbortController,
  params?: Partial<LawsuitCategory>,
): Promise<LawsuitCategoryResponseData> => {
  const response = await axios.delete(`/v1/lawsuit-category/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

export {
  lawsuitApiCall,
  deleteLawsuitApiCall,
  lawsuitChangeApiCall,
  lawsuitCreateApiCall,
  lawsuitPartialChangeApiCall,
  lawsuitDetailsApiCall,
  lawsuitEventsApiCall,
  lawsuitGetReportApiCall,
  lawsuitCategoryesListApiCall,
  createLawsuitCategoryesApiCall,
  editLawsuitCategoryApiCall,
  deleteLawsuitCategoryApiCall,
}
