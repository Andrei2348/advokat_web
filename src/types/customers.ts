import { LawsuitForm, Event } from './lawsuit'

export type ClientTableSortingDirection = 'desc' | 'asc'

export type ClientTableColumn = 'name' | 'lawsuit' | 'lastActiveAt'

export type Meta = {
  currentPage: number
  from: number
  lastPage: number
  links: []
  path: string
  perPage: number
  to: number
  total: number
}

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
  page?: number
}

export type CustomerLawsuitsPayload = {
  id: number
  page?: number
}

export type CustomersSuccessResponse<T> = {
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
  meta: Meta
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
  lawsuits?: CustomerLawsuitsResponseData
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

export type ClientLawsuit = {
  type: 'lawsuit' | 'event'
  lawsuit: LawsuitForm | null
  event: Event | null
}

export type CustomerLawsuitsResponseData = Meta & {
  data: ClientLawsuit[]
}
