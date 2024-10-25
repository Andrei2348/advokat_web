import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/useApiCall'
import {
  customersApiCall,
  getClientByIdApiCall,
  getClientLawsuitsApiCall,
  removeClientApiCall,
} from '@/api/customers'
import { RootState, RootGetters, RootActions } from './types'
import { useUXUIStore } from '../uxui'
import { modalsContent } from '@/config/deleteModalsConfig'
import {
  Customer,
  CustomersSearchPayload,
  CustomerResponse,
  CustomersSuccessResponse,
  CustomerLawsuitsResponseData,
  CustomerLawsuitsPayload,
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
      allClients: null,
      selectedClient: null,
      lastPage: 1,
      currentPage: 1,
      searchParams: null,
    }
  },
  getters: {
    getClientById: (state: RootState) => {
      return (id: number) => {
        return state.allClients?.data.find((client) => client.id === id)
      }
    },
  },
  actions: {
    async getClients(params?: CustomersSearchPayload) {
      const {
        data: allClients,
        executeApiCall: getClientsAction,
        error: allClientsError,
      } = useApiCall<CustomerResponse, DefaultError, CustomersSearchPayload>(
        customersApiCall,
        true,
      )

      if (params) {
        this.searchParams = params
      }

      try {
        await getClientsAction({ ...params })
        if (allClients.value) {
          const { lastPage, currentPage } = allClients.value.meta
          this.currentPage = currentPage
          this.lastPage = lastPage

          if (this.currentPage === 1) {
            this.allClients = allClients.value
            return
          }
          if (Array.isArray(this.allClients?.data)) {
            this.allClients = {
              data: [...this.allClients.data, ...allClients.value.data],
              links: allClients.value.links,
              meta: allClients.value.meta,
            }
          }
        }
      } catch (error) {
        if (allClientsError.value?.data.error) {
          console.log(allClientsError.value?.data.error)
        }
      }
    },
    async loadMoreClients() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++
        let newParams = { page: this.currentPage }
        if (this.searchParams) {
          newParams = { ...this.searchParams, ...newParams }
        }

        await this.getClients(newParams)
      }
    },
    async getClient(params: CustomerLawsuitsPayload) {
      const {
        data: clientData,
        executeApiCall: getClientData,
        error: clientError,
      } = useApiCall<
        CustomersSuccessResponse<Customer>,
        Error,
        CustomerLawsuitsPayload
      >(getClientByIdApiCall, true)

      try {
        await getClientData({ id: params.id })
        if (clientData.value) {
          this.selectedClient = clientData.value.data
        }
        await this.getClientLawsuits({ id: params.id, page: 1 })
      } catch (error) {
        if (clientError.value?.data.message) {
          console.log(clientError.value?.data.message)
        }
      }
    },
    async getClientLawsuits(params: CustomerLawsuitsPayload) {
      const {
        data: clientLawsuits,
        executeApiCall: getClientLawsuitsAction,
        error: clientLawsuitsError,
      } = useApiCall<
        CustomerLawsuitsResponseData,
        DefaultError,
        CustomerLawsuitsPayload
      >(getClientLawsuitsApiCall, true)

      try {
        await getClientLawsuitsAction(params)

        if (!clientLawsuits.value || !this.selectedClient) {
          return
        }

        const { lastPage, currentPage } = clientLawsuits.value
        this.lastPage = lastPage
        this.currentPage = currentPage

        if (this.currentPage === 1) {
          this.selectedClient.lawsuits = clientLawsuits.value
          return
        }
        if (this.selectedClient.lawsuits) {
          this.selectedClient.lawsuits = {
            ...clientLawsuits.value,
            data: [
              ...this.selectedClient.lawsuits.data,
              ...clientLawsuits.value.data,
            ],
          }
        }
      } catch (error) {
        if (clientLawsuitsError.value?.data.error) {
          console.log(clientLawsuitsError.value?.data.error)
        }
      }
    },
    async loadMoreClientLawsuits(params: CustomerLawsuitsPayload) {
      if (this.currentPage < this.lastPage) {
        this.currentPage++

        const newParams = { id: params.id, page: this.currentPage }
        await this.getClientLawsuits(newParams)
      }
    },
    async removeClientApiRequest(id: number) {
      const { executeApiCall: removeClient, error: removeClientError } =
        useApiCall<
          CustomersSuccessResponse<''>,
          DefaultError,
          CustomerLawsuitsPayload
        >(removeClientApiCall, true)
      try {
        await removeClient({ id })
        this.removeClient(id)
      } catch (error) {
        if (removeClientError.value?.data.error) {
          console.log(removeClientError.value?.data.error)
        }
      }
    },
    replaceClient(id: number, editedClient: Customer) {
      if (!this.allClients?.data) {
        return
      }
      const clientIndex = this.allClients.data.findIndex(
        (item) => item.id === id,
      )
      const currentClient = this.allClients.data[clientIndex]
      this.allClients.data[clientIndex] = { ...currentClient, ...editedClient }
    },
    addClient(newClient: Customer) {
      if (this.allClients?.data) {
        this.allClients.data = [...this.allClients.data, newClient]
      }
    },
    removeClient(id: number) {
      if (this.allClients?.data) {
        this.allClients.data = this.allClients.data.filter(
          (client) => client.id !== id,
        )
      }
    },
    resetSelectedClient() {
      this.selectedClient = null
    },
    openRemoveModal(id: number) {
      const uxuiStore = useUXUIStore()
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent['client'], id)
    },
  },
})
