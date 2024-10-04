// curl --location 'https://lawyer.softwarecenter.ru/api/v1/customer' \
// --header 'Accept: application/json'

import axios from 'axios'
import {
  CustomersFormPayload,
  CustomersFormSuccessResponse,
} from '@/types/customers'

const customersApiCall = async (
  abortController?: AbortController,
  params?: Partial<CustomersFormPayload>,
): Promise<CustomersFormSuccessResponse> => {
  const response = await axios.get(`/v1/customer`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

export { customersApiCall }
