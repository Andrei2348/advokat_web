import { defineComponent, reactive, ref, inject, watch, computed } from 'vue'
import ClientLawsuitsTable from '@/components/ClientLawsuitsTable/ClientLawsuitsTable.vue'
import { clientFormFields } from '@/config/clientFormConfig'
import { useClientsStore } from '@/store/client'
import { useApiCall } from '@/composables/useApiCall'
import { editCustomerApiCall, addClientApiCall } from '@/api/customers'
import { getFormatDateWithDash } from '@/helpers/dateFormatter'
import {
  CustomersFormSuccessResponse,
  CustomersFormPayload,
  Customer,
} from '@/types/customers'
import { DefaultError } from '@/types/httpError'

export default defineComponent({
  name: 'ClientForm',
  components: {
    ClientLawsuitsTable,
  },
  setup() {
    const fields = reactive({
      client: '',
      phone: '',
      email: '',
      telegram: '',
      whatsApp: '',
    })
    const birthDate = ref('')
    const isUserNew = ref(true)

    const isMobile = inject<boolean>('isMobile', false)
    const clientsStore = useClientsStore()
    const clientLawsuits = computed(() => clientsStore.selectedClient?.lawsuits)

    const {
      data: editedClient,
      error: editClientError,
      executeApiCall: editClient,
    } = useApiCall<
      CustomersFormSuccessResponse<Customer>,
      DefaultError,
      CustomersFormPayload
    >(editCustomerApiCall, true)

    const {
      data: newClient,
      error: newClientError,
      executeApiCall: addClient,
    } = useApiCall<
      CustomersFormSuccessResponse<Customer>,
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
          fields.client = name
          fields.phone = phone ?? ''
          fields.email = email ?? ''
          fields.telegram = telegram ?? ''
          fields.whatsApp = whatsApp ?? ''
          birthDate.value = clientBday ?? ''
          isUserNew.value = false
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

    const onDataChange = (objKey: string, value: number): void => {
      birthDate.value = String(value)
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
            name: fields.client,
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

        clientsStore.closeForm()
      } catch (error) {
        if (editClientError.value?.data.error) {
          console.log(editClientError.value?.data.error)
        }
      }
    }

    const handleClientCreation = async () => {
      try {
        await addClient({
          data: {
            name: fields.client,
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

        clientsStore.closeForm()
      } catch (error) {
        if (newClientError.value?.data.error) {
          console.log(newClientError.value?.data.error)
        }
      }
    }

    const clientFormSubmitHandler = computed(() =>
      isUserNew.value ? handleClientCreation : handleClientEditing,
    )

    return {
      fields,
      birthDate,
      isUserNew,
      clientLawsuits,
      clientFormFields,
      isMobile,
      onCopyClick,
      onDataChange,
      onRemoveBtnClick,
      clientFormSubmitHandler,
    }
  },
})
