import { StatusType } from './lawsuit'

export type EventChangeForm = {
  id: number
  status: StatusType
}

export type EventChangeFormResponse = {
  success: number
  data: EventData
  error: string | null
}

export type EventData = {
  id: number
  theme: string
  is_important: boolean
  since: string
  till: string | null
  cost: number | null
  place: string
  comment: string | null
  remain_days: number
  created_at: string
  updated_at: string | null
  status: string
  customer: CustomerData
  lawsuit: any
}

export type CustomerData = {
  id: number
  name: string
  telegram: string
  whats_app: string
  phone: string
  email: string
  last_active_at: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string | null
}

export type EventPartialChangeForm = {
  id: number | null
  includeInReport?: boolean
  isImportant?: boolean
}

export type EventsTypesResponse = {
  success: number
  data: EventCategory[]
  error: null
}

export type EventCategory = {
  id: number | null
  name: string
  color: string
  notifyBeforeHours: number | null
  markBeforeDays: number | null
  createdAt: string | null
  updatedAt: string | null
  type: string | null
  isBillable: boolean
}
export type OptionsItem = {
  id: number
  name: string
}

export type EventCategoryRequestData = {
  id: number
  name: string
  color: string
  notifyBeforeHours: number | null
  markBeforeDays: number | null
}

export type EventsTypesChangeResponse = {
  success: number
  data: EventCategory
  error: null
}
