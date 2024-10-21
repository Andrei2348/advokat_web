import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/useApiCall'
import {
  customersApiCall,
  getClientLawsuitsApiCall,
  removeClientApiCall,
} from '@/api/customers'
import { RootState, RootGetters, RootActions } from './types'
import { useUXUIStore } from '../uxui'
import { modalsContent } from '@/config/deleteModalsConfig'
import {
  Customer,
  CustomerResponse,
  CustomersFormSuccessResponse,
  ClientLawsuitResponseData,
  CustomerIdPayload,
} from '@/types/customers'
import { DefaultError } from '@/types/httpError'

export const useClientsStore = defineStore<
  string,
  RootState,
  RootGetters,
  RootActions
>('clients', {
  state: () => {
    return {
      allClients: {
        data: [],
        links: {
          first: '',
          last: '',
        },
      },
      selectedClient: null,
      isTableShown: true,
    }
  },
  getters: {
    getClientById: (state: RootState) => {
      return (id: number) => {
        return state.allClients.data.find((client) => client.id === id)
      }
    },
  },
  actions: {
    async getClients(params?: any) {
      const {
        data: allClients,
        executeApiCall: getClientsAction,
        error: allClientsError,
      } = useApiCall<CustomersFormSuccessResponse<Customer[]>, DefaultError>(
        customersApiCall,
        true,
      )

      try {
        await getClientsAction({ ...params })
        if (allClients.value) {
          this.allClients = allClients.value as unknown as CustomerResponse
        }
      } catch (error) {
        if (allClientsError.value?.data.error) {
          console.log(allClientsError.value?.data.error)
        }
      }
    },
    async getClientLawsuits(id: number) {
      const {
        data: clientLawsuits,
        executeApiCall: getClientLawsuitsAction,
        error: clientLawsuitsError,
      } = useApiCall<
        CustomersFormSuccessResponse<ClientLawsuitResponseData[]>,
        DefaultError,
        CustomerIdPayload
      >(getClientLawsuitsApiCall, true)

      try {
        await getClientLawsuitsAction({ id })
        if (clientLawsuits.value && this.selectedClient) {
          this.selectedClient.lawsuits = clientLawsuits.value.data
        }
      } catch (error) {
        if (clientLawsuitsError.value?.data.error) {
          console.log(clientLawsuitsError.value?.data.error)
        }
      }
    },
    async removeClientApiRequest(id: number) {
      const { executeApiCall: removeClient, error: removeClientError } =
        useApiCall<
          CustomersFormSuccessResponse<''>,
          DefaultError,
          CustomerIdPayload
        >(removeClientApiCall, true)
      try {
        await removeClient({ id })
        this.removeClient(id)
        if (!this.isTableShown) {
          this.closeForm()
        }
      } catch (error) {
        if (removeClientError.value?.data.error) {
          console.log(removeClientError.value?.data.error)
        }
      }
    },
    replaceClient(id: number, editedClient: Customer) {
      if (!this.allClients.data) {
        return
      }
      const clientIndex = this.allClients.data.findIndex(
        (item) => item.id === id,
      )
      this.allClients.data[clientIndex] = editedClient
    },
    addClient(newClient: Customer) {
      this.allClients.data = [...this.allClients.data, newClient]
    },
    removeClient(id: number) {
      this.allClients.data = this.allClients.data.filter(
        (client) => client.id !== id,
      )
    },
    resetSelectedClient() {
      this.selectedClient = null
    },
    openForm() {
      this.isTableShown = false
    },
    closeForm() {
      this.isTableShown = true
      this.resetSelectedClient()
    },
    openRemoveModal(id: number) {
      const uxuiStore = useUXUIStore()
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent['client'], id)
    },
  },
})
