import { defineComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import {
  FormObjectRequest,
  LawsuitFormActSuccessResponse,
} from '@/types/lawsuit'
import { useRoute } from 'vue-router'
import { lawsuitGetReportApiCall } from '@/api/lawsuit'
import { useApiCall } from '@/composables/useApiCall'
import { DefaultError } from '@/types/httpError'

export default defineComponent({
  name: 'FormationAct',

  setup() {
    const uxuiStore = useUXUIStore()
    const route = useRoute()
    const formRequest = ref<FormObjectRequest>({ id: '', since: '', till: '' })
    const disableButton = ref(true)
    const errorFields = ref<null | DefaultError['error']>(null)
    const pdfReport = ref<string | null>(null)

    const {
      data: lawsuitData,
      executeApiCall: sendDataForReport,
      error: lawsuitError,
    } = useApiCall<
      LawsuitFormActSuccessResponse,
      DefaultError,
      FormObjectRequest
    >(lawsuitGetReportApiCall, true)

    const setRequestReport = async (payload: FormObjectRequest) => {
      try {
        await sendDataForReport(payload)
        if (lawsuitData.value) {
          const blob = new Blob([lawsuitData.value], {
            type: 'application/pdf',
          })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          document.body.appendChild(a)
          a.download = 'testFile.pdf'
          a.click()
          window.URL.revokeObjectURL(url)
          uxuiStore.setModalName('')
        }
      } catch (error) {
        console.error('Error:', error)
        if (lawsuitError.value?.data?.error) {
          errorFields.value = lawsuitError.value.data.error
        }
      }
    }

    const handleClose = (): void => {
      uxuiStore.setModalName('')
    }

    const dataChange = (
      objKey: keyof FormObjectRequest,
      value: string,
    ): void => {
      formRequest.value[objKey] = value
    }

    const setFormRequest = (): void => {
      if (!Array.isArray(route.params.id)) {
        formRequest.value.id = route.params.id
      }
      setRequestReport(formRequest.value)
    }

    watch(
      () => [formRequest.value.since, formRequest.value.till],
      ([newSinceValue, newTillValue]) => {
        disableButton.value = !(
          newSinceValue !== '' &&
          newSinceValue !== 'Invalid Date' &&
          newTillValue !== '' &&
          newTillValue !== 'Invalid Date'
        )
      },
    )

    onBeforeUnmount(() => {
      formRequest.value = { id: '', since: '', till: '' }
      pdfReport.value = null
    })
    return {
      handleClose,
      dataChange,
      setFormRequest,
      disableButton,
      pdfReport,
    }
  },
})
