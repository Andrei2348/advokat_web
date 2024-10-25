import {
  defineComponent,
  reactive,
  ref,
  inject,
  watch,
  computed,
  DefineComponent,
  onMounted,
  onUnmounted,
} from 'vue'
import { useRouter } from 'vue-router'
import ClientLawsuitsTable from '@/components/ClientLawsuitsTable/ClientLawsuitsTable.vue'
import { clientFormFields } from '@/config/clientFormConfig'
import { useClientsStore } from '@/store/client'
import { useUXUIStore } from '@/store/uxui'
import { useApiCall } from '@/composables/useApiCall'
import { useScrolling } from '@/composables/useScrolling'
import { editCustomerApiCall, addClientApiCall } from '@/api/customers'
import { getFormatDateWithDash } from '@/helpers/dateFormatter'
import {
  CustomersSuccessResponse,
  CustomersFormPayload,
  CustomerLawsuitsPayload,
  Customer,
} from '@/types/customers'
import { DefaultError } from '@/types/httpError'

export default defineComponent({
  name: 'ClientForm',
  components: {
    ClientLawsuitsTable,
  },
  setup() {
    type Errors = Record<keyof typeof fields, string[]> & {
      birthDate: string[]
    }
    const fields = reactive({
      name: '',
      phone: '',
      email: '',
      telegram: '',
      whatsApp: '',
    })
    const birthDate = ref('')
    const isClientNew = ref(true)
    const clientLawsuitsList = ref<DefineComponent<
      typeof ClientLawsuitsTable
    > | null>(null)
    const errors = ref<Errors | null>(null)

    const isMobile = inject<boolean>('isMobile', false)
    const clientsStore = useClientsStore()
    const clientLawsuits = computed(
      () => clientsStore.selectedClient?.lawsuits?.data,
    )
    const uxuiStore = useUXUIStore()
    const router = useRouter()

    const handleClientLawsuitsScrolling = computed(() => {
      const handler = useScrolling<
        typeof ClientLawsuitsTable,
        CustomerLawsuitsPayload
      >(clientLawsuitsList.value, clientsStore.loadMoreClientLawsuits, {
        id: clientsStore.selectedClient ? clientsStore.selectedClient.id : NaN,
      })
      return handler
    })
    const clientLawsuitsScrollHandler = async () =>
      await handleClientLawsuitsScrolling.value()

    const {
      data: editedClient,
      error: editClientError,
      executeApiCall: editClient,
    } = useApiCall<
      CustomersSuccessResponse<Customer>,
      DefaultError,
      CustomersFormPayload
    >(editCustomerApiCall, true)

    const {
      data: newClient,
      error: newClientError,
      executeApiCall: addClient,
    } = useApiCall<
      CustomersSuccessResponse<Customer>,
      DefaultError,
      CustomersFormPayload
    >(addClientApiCall, true)

    watch(
      () => clientsStore.selectedClient,
      (newValue) => {
        if (newValue !== null && clientsStore.selectedClient) {
          const {
            name,
            phone,
            email,
            birthDate: clientBday,
            telegram,
            whatsApp,
          } = clientsStore.selectedClient
          fields.name = name
          fields.phone = phone ?? ''
          fields.email = email ?? ''
          fields.telegram = telegram ?? ''
          fields.whatsApp = whatsApp ?? ''
          birthDate.value = clientBday ?? ''
          isClientNew.value = false
        }
      },
      { immediate: true, deep: true },
    )

    const adaptPhoneNumberToServer = (phone: string) => {
      return phone.split(' ').join('').replace(/[()+]/g, '')
    }

    const onCopyClick = (inputValue: string) => {
      navigator.clipboard.writeText(inputValue)
    }

    const onDataChange = (objKey: string, value: string): void => {
      if (value === 'Invalid Date') {
        birthDate.value = ''
        return
      }
      birthDate.value = value
    }

    const onRemoveBtnClick = () => {
      if (clientsStore.selectedClient) {
        clientsStore.openRemoveModal(clientsStore.selectedClient?.id)
      }
    }

    const handleClientEditing = async () => {
      try {
        await editClient({
          id: clientsStore.selectedClient?.id,
          data: {
            name: fields.name,
            phone: fields.phone ? adaptPhoneNumberToServer(fields.phone) : null,
            email: fields.email ? fields.email : null,
            telegram: fields.telegram
              ? adaptPhoneNumberToServer(fields.telegram)
              : null,
            whatsApp: fields.whatsApp ? fields.whatsApp : null,
            birthDate: birthDate.value
              ? getFormatDateWithDash(birthDate.value)
              : null,
          },
        })

        if (editedClient.value?.data) {
          clientsStore.replaceClient(
            clientsStore.selectedClient!.id,
            editedClient.value?.data,
          )
        }

        await router.push('/clients')
      } catch (error) {
        if (editClientError.value?.data.error.errors) {
          errors.value = editClientError.value?.data.error.errors as Errors
        }
      }
    }

    const handleClientCreation = async () => {
      try {
        await addClient({
          data: {
            name: fields.name,
            phone: fields.phone ? adaptPhoneNumberToServer(fields.phone) : null,
            email: fields.email ? fields.email : null,
            telegram: fields.telegram
              ? adaptPhoneNumberToServer(fields.telegram)
              : null,
            whatsApp: fields.whatsApp ? fields.whatsApp : null,
            birthDate: birthDate.value
              ? getFormatDateWithDash(birthDate.value)
              : null,
          },
        })

        if (newClient.value?.data) {
          clientsStore.addClient(newClient.value?.data)
        }

        uxuiStore.setModalName('')
      } catch (error) {
        if (newClientError.value?.data.error.errors) {
          errors.value = newClientError.value?.data.error.errors as Errors
        }
      }
    }

    const clientFormSubmitHandler = computed(() =>
      isClientNew.value ? handleClientCreation : handleClientEditing,
    )

    onMounted(() => {
      window.addEventListener('scroll', clientLawsuitsScrollHandler)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', clientLawsuitsScrollHandler)
    })

    return {
      fields,
      birthDate,
      isClientNew,
      errors,
      clientLawsuits,
      clientLawsuitsList,
      clientFormFields,
      isMobile,
      onCopyClick,
      onDataChange,
      onRemoveBtnClick,
      clientFormSubmitHandler,
    }
  },
})
