import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const exampleHandlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/v1/slider-item/`, async () => {
    return HttpResponse.json({}, { status: 200 })
  }),
]

export const server = setupServer(...exampleHandlers)
