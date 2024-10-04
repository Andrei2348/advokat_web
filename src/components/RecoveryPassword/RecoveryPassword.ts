import { defineComponent, reactive, ref, Ref } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import { recoveryPasswordApiCall } from '@/api/auth'
import {
  MessageFormSuccessResponse,
  RecoveryPasswordPayload,
} from '@/types/auth'
import { DefaultError } from '@/types/httpError'

export default defineComponent({
  name: 'RecoveryPassword',
  setup() {
    const fields = reactive({
      email: '',
    })
    const errorFields = ref(null) as Ref<null | DefaultError['error']>

    const {
      isLoading: isRecoveryLoading,
      data: recoveryData,
      error: recoveryError,
      executeApiCall: sendRecoveryForm,
    } = useApiCall<
      MessageFormSuccessResponse,
      DefaultError,
      RecoveryPasswordPayload
    >(recoveryPasswordApiCall, true, fields)

    const sendForm = async () => {
      try {
        await sendRecoveryForm()
      } catch {
        if (recoveryError.value?.data.error) {
          errorFields.value = recoveryError.value.data.error
        }
      }
    }

    return {
      fields,
      errorFields,
      isRecoveryLoading,
      recoveryData,
      sendForm,
    }
  },
})
