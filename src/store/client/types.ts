import {
  Customer,
  CustomersSearchPayload,
  CustomerLawsuitsPayload,
  CustomerWithLawsuits,
  CustomerResponse,
} from '@/types/customers'

export type RootState = {
  allClients: CustomerResponse | null
  selectedClient: CustomerWithLawsuits | null
  lastPage: number
  currentPage: number
  searchParams: CustomersSearchPayload | null
}

export type RootGetters = {
  getClientById: (state: RootState) => (id: number) => Customer | undefined
}

export type RootActions = {
  getClients: (params?: CustomersSearchPayload) => Promise<void>
  loadMoreClients: () => Promise<void>
  getClient: (params: CustomerLawsuitsPayload) => Promise<void>
  getClientLawsuits: (params: CustomerLawsuitsPayload) => Promise<void>
  loadMoreClientLawsuits: (params: CustomerLawsuitsPayload) => Promise<void>
  removeClientApiRequest: (id: number) => Promise<void>
  resetSelectedClient: () => void
  replaceClient: (id: number, editedClient: Customer) => void
  addClient: (newClient: Customer) => void
  removeClient: (id: number) => void
  openRemoveModal: (id: number) => void
}
