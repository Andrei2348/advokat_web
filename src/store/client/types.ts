import {
  Customer,
  CustomerWithLawsuits,
  CustomerResponse,
} from '@/types/customers'

export type RootState = {
  allClients: CustomerResponse
  selectedClient: CustomerWithLawsuits | null
  isTableShown: boolean
}

export type RootGetters = {
  getClientById: (state: RootState) => (id: number) => Customer | undefined
}

export type RootActions = {
  getClients: (params?: any) => Promise<void>
  getClientLawsuits: (id: number) => Promise<void>
  removeClientApiRequest: (id: number) => Promise<void>
  resetSelectedClient: () => void
  replaceClient: (id: number, editedClient: Customer) => void
  addClient: (newClient: Customer) => void
  removeClient: (id: number) => void
  openForm: () => void
  closeForm: () => void
  openRemoveModal: (id: number) => void
}
