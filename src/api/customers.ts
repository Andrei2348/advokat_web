// curl --location 'https://lawyer.softwarecenter.ru/api/v1/customer' \
// --header 'Accept: application/json'

import axios from 'axios'
import {
  Customer,
  CustomersFormPayload,
  CustomersSearchPayload,
  CustomerIdPayload,
  ClientLawsuitResponseData,
  CustomersFormSuccessResponse,
} from '@/types/customers'

export const customersApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomersSearchPayload>,
): Promise<CustomersFormSuccessResponse<Customer[]>> => {
  const response = await axios.get(`/v1/customer`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

export const editCustomerApiCall = async (
  abortController: AbortController,
  params?: Partial<CustomersFormPayload>,
): Promise<CustomersFormSuccessResponse<Customer>> => {
  const response = await axios.put(
    `/v1/customer/${params?.id}`,
    { ...params?.data },
    {
      signal: abortController?.signal,
    },
  )

  return response.data
}

export const getClientLawsuitsApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomerIdPayload>,
): Promise<CustomersFormSuccessResponse<ClientLawsuitResponseData[]>> => {
  const response = await axios.get(`/v1/customer/${params?.id}/lawsuits`, {
    signal: abortController?.signal,
  })

  return response.data
}

export const addClientApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomersFormPayload>,
): Promise<CustomersFormSuccessResponse<Customer>> => {
  const response = await axios.post(
    '/v1/customer',
    { ...params?.data },
    { signal: abortController?.signal },
  )

  return response.data
}

export const removeClientApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomerIdPayload>,
): Promise<CustomersFormSuccessResponse<''>> => {
  const result = await axios.delete(`v1/customer/${params?.id}`, {
    signal: abortController?.signal,
  })
  return result.data
}
