import { defineComponent, reactive, ref, Ref, computed } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import { loginApiCall } from '@/api/auth'
import { LoginFormPayload, MessageFormSuccessResponse } from '@/types/auth'
import { DefaultError } from '@/types/httpError'
import dayjs from 'dayjs'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthForm',
  setup() {
    const fieldsLogin = reactive({
      email: '',
      password: '',
    })
    const fieldsAuth = reactive({
      email: '',
      code: '',
    })
    const timer = ref(0)
    const progress: Ref<null | ReturnType<typeof setTimeout>> = ref(null)
    const isLogin = ref(true)
    const isShowPassword = ref(false)
    const errorFields = ref(null) as Ref<null | DefaultError['error']>
    const isSmsLoading = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const {
      isLoading: isLoginLoading,
      data: loginData,
      error: loginError,
      executeApiCall: sendLoginForm,
    } = useApiCall<MessageFormSuccessResponse, DefaultError, LoginFormPayload>(
      loginApiCall,
      true,
      fieldsLogin,
    )

    const fieldType = (key: string) => {
      if (key === 'password') {
        return isShowPassword.value ? 'text' : 'password'
      } else {
        return 'email'
      }
    }

    const formatTimer = computed(() => {
      return dayjs(timer.value * 1000).format('mm:ss')
    })

    const sendForm = async () => {
      try {
        await sendLoginForm()
        if (loginData.value) {
          errorFields.value = null
          timer.value = 60
          fieldsAuth.email = fieldsLogin.email
          isLogin.value = false
          progress.value = setInterval(() => {
            timer.value--
            if (!timer.value && progress.value) {
              clearInterval(progress.value)
            }
          }, 1000)
        }
      } catch {
        if (loginError.value?.data.error) {
          errorFields.value = loginError.value.data.error
        }
      }
    }

    const sendSmsCode = async () => {
      isSmsLoading.value = true
      try {
        await authStore.smsLogin(fieldsAuth)
        if (authStore.isAuth) {
          await router.push({ name: 'home' })
        }
      } catch {
        errorFields.value = authStore.error
      }
      isSmsLoading.value = false
    }

    const showPassword = () => {
      isShowPassword.value = !isShowPassword.value
    }
    return {
      isShowPassword,
      fieldsLogin,
      errorFields,
      timer,
      progress,
      isLogin,
      isLoginLoading,
      fieldType,
      showPassword,
      sendForm,
      fieldsAuth,
      formatTimer,
      sendSmsCode,
      isSmsLoading,
    }
  },
})
