import { computed, defineComponent, reactive, ref, Ref } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import { registrationApiCall, registrationCodeApiCall } from '@/api/auth'
import {
  AuthFormSuccessResponse,
  MessageFormSuccessResponse,
  RegistrationPayload,
  SMSLoginFormPayload,
} from '@/types/auth'
import { DefaultError } from '@/types/httpError'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'RegistrationForm',
  setup() {
    const fieldsCodeStep = reactive({
      code: '',
      email: '',
    })
    const fieldsFirstStep = reactive({
      lastname: '',
      name: '',
      surname: '',
      type: 'advocate',
    })
    const fieldsSecondStep = reactive({
      email: '',
      password: '',
      repeatPassword: '',
      phone: '',
    })
    const timer = ref(0)
    const progress: Ref<null | ReturnType<typeof setTimeout>> = ref(null)
    const step = ref('first')
    const isShowPassword = ref(false)
    const isShowRepeatPassword = ref(false)
    const errorFields = ref(null) as Ref<null | DefaultError['error']>
    const router = useRouter()
    const authStore = useAuthStore()
    const {
      isLoading: isRegistrationLoading,
      data: registrationData,
      error: registrationError,
      executeApiCall: sendRegistrationForm,
    } = useApiCall<
      MessageFormSuccessResponse,
      DefaultError,
      RegistrationPayload
    >(registrationApiCall, true)

    const {
      isLoading: isCodeLoading,
      data: codeData,
      error: codeError,
      executeApiCall: sendCode,
    } = useApiCall<AuthFormSuccessResponse, DefaultError, SMSLoginFormPayload>(
      registrationCodeApiCall,
      true,
    )

    const fieldType = (key: string) => {
      switch (key) {
        case 'password':
          return isShowPassword.value ? 'text' : 'password'
        case 'repeatPassword':
          return isShowRepeatPassword.value ? 'text' : 'password'
        case 'email':
          return 'email'
        default:
          return 'text'
      }
    }

    const sendForm = async () => {
      errorFields.value = null
      if (fieldsSecondStep.password !== fieldsSecondStep.repeatPassword) {
        errorFields.value = {
          errors: { repeatPassword: ['Пароли не совпадают'] },
        }
        return
      }
      try {
        await sendRegistrationForm({
          name: fieldsFirstStep.name,
          lastname: fieldsFirstStep.lastname,
          surname: fieldsFirstStep.surname,
          type: fieldsFirstStep.type,
          email: fieldsSecondStep.email,
          phone: fieldsSecondStep.phone.replaceAll(' ', '').slice(1),
          password: fieldsSecondStep.password,
          repeatPassword: fieldsSecondStep.repeatPassword,
        })
        if (registrationData.value) {
          errorFields.value = null
          timer.value = 60
          fieldsCodeStep.email = fieldsSecondStep.email
          step.value = 'code'
          progress.value = setInterval(() => {
            timer.value--
            if (!timer.value && progress.value) {
              clearInterval(progress.value)
            }
          }, 1000)
        }
      } catch {
        if (registrationError.value?.data.error) {
          errorFields.value = registrationError.value.data.error
        }
      }
    }

    const sendSmsCode = async () => {
      try {
        await sendCode(fieldsCodeStep)
        if (codeData.value) {
          await authStore.writeData(codeData.value.data)
          await router.push({ name: 'home' })
        }
      } catch {
        if (codeError.value?.data.error.error) {
          errorFields.value = { error: codeError.value?.data.error.error }
        }
      }
    }

    const nextStepHandler = async () => {
      step.value = 'second'
    }

    const backHandler = async () => {
      step.value = 'first'
    }

    const showPassword = (key: string) => {
      if (key === 'password') {
        isShowPassword.value = !isShowPassword.value
      } else {
        isShowRepeatPassword.value = !isShowRepeatPassword.value
      }
    }

    const formatTimer = computed(() => {
      return dayjs(timer.value * 1000).format('mm:ss')
    })

    return {
      isShowPassword,
      isShowRepeatPassword,
      fieldsFirstStep,
      errorFields,
      fieldType,
      showPassword,
      sendForm,
      fieldsSecondStep,
      nextStepHandler,
      isRegistrationLoading,
      registrationData,
      step,
      isCodeLoading,
      sendSmsCode,
      backHandler,
      timer,
      formatTimer,
      fieldsCodeStep,
    }
  },
})
