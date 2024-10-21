import { Customer } from '@/types/customers'
import { Task } from './tasks'

export type LawsuitsFormSuccessResponse = {
  data: LawsuitForm[]
  success: boolean
}

export type LawsuitFormSuccessResponse = {
  data: LawsuitForm
  success: boolean
}
export type LawsuitFormActSuccessResponse = string

export type LawsuitFormPayload = {
  id: number | null
  opponentSort?: string
  itemsPerPage?: number
  customerId?: number
}

export type TableItems = {
  id?: number
  title: string
  important?: boolean
}

export type RootState = {
  lawsuitData: object[] | null
  lawsuitSelectedId: null | number
}

export type LawsuitEvent = {
  id: number
  theme: string
  isImportant: boolean
  till: string | null
  cost: number | null
  place: string
  comment: string | null
  remainDays: number
  createdAt: string
  updatedAt: string
}

export type LawsuitCategory = {
  id: number | null
  name: string
  color: string
  notifyBeforeHours: number | null
  markBeforeDays: number | null
  createdAt: string | null
  updatedAt: string | null
}

export type LawsuitForm = {
  id: number
  plot: string
  opponent: string
  rating: number
  contractNumber: string
  contractSigningDate: string | null
  contractValidity: string | null
  powerOfAttorney: string
  powerOfAttorneySigningDate: string
  powerOfAttorneyValidity: string
  contractEndMonths: number
  contractEndDays: number
  powerOfAttorneyEndMonths: number
  powerOfAttorneyEndDays: number
  createdAt: string
  updatedAt: string
  customer: Customer
  lawsuitCategory: LawsuitCategory
  authorities: authoritiesForm[]
  lawsuitEvents: LawsuitEvent[]
  lawsuitEventsCount: number
  authoritiesCount: number | null
  status: StatusType
}

type authoritiesForm = {
  authority: string
  cabinet: string
  comment: string
  createdAt: string
  id: number
  judge: string
  lawsuitNumber: string
  lawsuitNumberLink: string | null
  updatedAt: string
}

export type LawsuitFormObject = {
  [key: string]: unknown
  id: number | null
  plot: string
  opponent: string
  rating: number
  contractNumber?: string | null
  contractSigningDate?: string | null
  contractValidity?: string | null
  powerOfAttorney?: string | null
  powerOfAttorneySigningDate?: string | null
  powerOfAttorneyValidity?: string | null
  customerId?: number | null
  lawsuitCategoryId: number | null
}

export type LawsuitPartialFormObject = {
  id: number
  status: StatusType
}

// Lawsuit Events and Tasks
export type StatusType = 'finished' | 'planned'

type LawsuitEventCategory = {
  id: number
  name: string
  isBillable: boolean
  color: string
  type: SelectedPlan | null
}

export type Event = {
  comment: string | null
  cost: number | null
  createdAt: string
  id: number
  includeInReport: boolean
  isAllDay: boolean
  isImportant: boolean
  lawsuitEventCategory: LawsuitEventCategory
  place: string
  remainDays: number
  remainTimeDays: number
  since: string
  status: StatusType
  theme: string
  till: string
  updatedAt: string
  task: string | null
}

export type TaskEvent = {
  task: Task
  event: Event
  type: SelectedPlan
}
export type TaskEventResponse = {
  data: TaskEvent[]
}

export type FormObjectRequest = {
  since: string
  till: string
  id: string
}

export type SelectedPlan = 'event' | 'task'

export type LawsuitTaskEventTableTab = 'Запланировано' | 'Выполнено'

export type LawsuitCategoryResponseData = {
  success: number
  data: LawsuitCategory[]
  error: string | null
}
