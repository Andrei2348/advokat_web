import axios from 'axios'
import { useAuthStore } from '@/store/auth'

axios.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.baseURL = import.meta.env.VITE_API_BASE_URL
    const authStore = useAuthStore()
    if (authStore.isAuth) {
      config.headers['Authorization'] =
        `${authStore.tokenType} ${authStore.token}`
    }
  }
  return config
})

axios.interceptors.response.use(undefined, async (error) => {
  if (!axios.isCancel(error) && [401].includes(error?.response?.status)) {
    console.log(error?.response?.status)
    // window.location.reload()
  }
  return Promise.reject(error)
})
