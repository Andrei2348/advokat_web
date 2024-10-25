// curl --location 'https://lawyer.softwarecenter.ru/api/v1/customer' \
// --header 'Accept: application/json'

import axios from 'axios'
import {
  Customer,
  CustomerResponse,
  CustomersFormPayload,
  CustomersSearchPayload,
  CustomerLawsuitsPayload,
  CustomerLawsuitsResponseData,
  CustomersSuccessResponse,
} from '@/types/customers'

export const customersApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomersSearchPayload>,
): Promise<CustomerResponse> => {
  const response = await axios.get(`/v1/customer`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

export const editCustomerApiCall = async (
  abortController: AbortController,
  params?: Partial<CustomersFormPayload>,
): Promise<CustomersSuccessResponse<Customer>> => {
  const response = await axios.put(
    `/v1/customer/${params?.id}`,
    { ...params?.data },
    {
      signal: abortController?.signal,
    },
  )

  return response.data
}

export const getClientByIdApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomerLawsuitsPayload>,
): Promise<CustomersSuccessResponse<Customer>> => {
  const response = await axios.get(`/v1/customer/${params?.id}`, {
    signal: abortController?.signal,
  })

  return response.data
}

export const getClientLawsuitsApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomerLawsuitsPayload>,
): Promise<CustomerLawsuitsResponseData> => {
  const response = await axios.get(
    `/v1/customer/${params?.id}/lawsuits${params?.page ? `?page=${params?.page}` : ''}`,
    {
      signal: abortController?.signal,
    },
  )

  return response.data
}

export const addClientApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomersFormPayload>,
): Promise<CustomersSuccessResponse<Customer>> => {
  const response = await axios.post(
    '/v1/customer',
    { ...params?.data },
    { signal: abortController?.signal },
  )

  return response.data
}

export const removeClientApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomerLawsuitsPayload>,
): Promise<CustomersSuccessResponse<''>> => {
  const result = await axios.delete(`v1/customer/${params?.id}`, {
    signal: abortController?.signal,
  })
  return result.data
}
