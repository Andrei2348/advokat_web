import axios from 'axios'
import {
  EventChangeForm,
  EventChangeFormResponse,
  EventPartialChangeForm,
  EventsTypesResponse,
  EventCategory,
  EventsTypesChangeResponse,
} from '@/types/events'

const eventChangeStatusApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventChangeForm>,
): Promise<EventChangeFormResponse> => {
  const response = await axios.post(
    `/v1/lawsuit-event/${params?.id}/status`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const eventPartialChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventPartialChangeForm>,
): Promise<EventChangeFormResponse> => {
  const response = await axios.patch(
    `/v1/lawsuit-event/${params?.id}/partial-update`,
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const deleteEventApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventPartialChangeForm>,
): Promise<EventChangeFormResponse> => {
  const response = await axios.delete(`/v1/lawsuit-event/${params?.id}`, {
    signal: abortController?.signal,
  })
  return response.data
}

const eventsTypesListApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventPartialChangeForm>,
): Promise<EventsTypesResponse> => {
  const response = await axios.get('/v1/lawsuit-event-category', {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

const deleteEventsTypeApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventCategory>,
): Promise<EventsTypesResponse> => {
  const response = await axios.delete(
    `/v1/lawsuit-event-category/${params?.id}`,
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

const eventsTypeChangeApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventCategory>,
): Promise<EventsTypesChangeResponse> => {
  console.log('put')
  const response = await axios.put(
    `/v1/lawsuit-event-category/${params?.id}`,
    { ...params },
    { signal: abortController?.signal },
  )
  return response.data
}

const eventsTypeCreateApiCall = async (
  abortController?: AbortController,
  params?: Partial<EventCategory>,
): Promise<EventsTypesChangeResponse> => {
  const response = await axios.post(
    '/v1/lawsuit-event-category',
    { ...params },
    {
      signal: abortController?.signal,
    },
  )
  return response.data
}

export {
  eventChangeStatusApiCall,
  eventPartialChangeApiCall,
  deleteEventApiCall,
  eventsTypesListApiCall,
  deleteEventsTypeApiCall,
  eventsTypeChangeApiCall,
  eventsTypeCreateApiCall,
}
