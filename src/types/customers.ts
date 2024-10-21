import { LawsuitForm, Event } from './lawsuit'

export type ClientTableSortingDirection = 'desc' | 'asc'

export type ClientTableColumn = 'name' | 'lawsuit' | 'lastActiveAt'

export type ClientTableSortingType = {
  currentColumnSorted: null | ClientTableColumn
  sortingDirection: ClientTableSortingDirection
}

export type CustomersFormPayload = {
  data: Partial<Customer>
  id?: number
}

export type CustomersSearchPayload = {
  name?: string
  contractValidityValid?: 1 | 0
}

export type CustomerIdPayload = {
  id: number
}

export type CustomersFormSuccessResponse<T> = {
  data: T
  success: number
  error: null | string
}

export type CustomerResponse = {
  data: Customer[] | []
  links: {
    first: string
    last: string
  }
}

export type Customer = {
  id: number
  name: string
  birthDate: string | null
  telegram: string | null
  whatsApp: string | null
  phone: string | null
  email: string | null
  lastActiveAt: string | null
  deletedAt: string | null
  createdAt: string
  updatedAt: string | null
  latestValidityLawsuit: LawsuitForm | null
}

export type CustomerWithLawsuits = Customer & {
  lawsuits?: ClientLawsuitResponseData[]
}

export type ModifiedCustomer = Customer & {
  isActive: boolean
  year: string
}

export type CustomerTableHeaderItem = {
  id: number
  title: string
  column?: ClientTableColumn
  willBeSorting: boolean
}

export type ClientLawsuitResponseData = {
  type: 'lawsuit' | 'event'
  lawsuit: LawsuitForm | null
  event: Event | null
}
