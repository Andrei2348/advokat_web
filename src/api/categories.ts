import axios from 'axios'
import {
  CategoriesFormPayload,
  CategoriesFormSuccessResponse,
} from '@/types/categories'

const lawyerCategoryApiCall = async (
  abortController?: AbortController,
  params?: Partial<CategoriesFormPayload>,
): Promise<CategoriesFormSuccessResponse> => {
  const response = await axios.get(`/v1/lawsuit-category`, {
    params: { ...params },
    signal: abortController?.signal,
  })
  return response.data
}

export { lawyerCategoryApiCall }
