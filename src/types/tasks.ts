import { LawsuitForm, StatusType } from './lawsuit'
import { Customer } from './customers'
import { Event } from './lawsuit'

export type TaskSearchPayload = {
  customerIds?: number[] | []
  lawsuitIds?: number[] | []
  taskTagIds?: number[] | []
  itemsPerPage?: number
  status?: 'planned' | 'finished'
  since?: string | null
  till?: string | null
  isBillable?: boolean
  theme?: string
  page?: number
  deadlineSort?: 'desc' | 'asc' | null
}

export type TaskStatusChangePayload = {
  id: number
  status: StatusType
}

export type TaskResponse<T> = {
  success: number
  data: T
  error: string | null
}

export type TaskSearchData = {
  data: Task[] | []
  links: {
    first: string
    last: string
    prev: null
    next: null
  }
  meta: {
    currentPage: number
    from: number
    lastPage: number
    links: []
    path: string
    perPage: number
    to: number
    total: number
  }
}

export type PartialTask = {
  id: number
  theme: string
  isImportant: boolean
  status: StatusType
  deadline: string
  toDoDate: string
  cost: number | null
  comment: string | null
  createdAt: string
  updatedAt: string
  includeInReport: boolean
}

export type Task = PartialTask & {
  customer: Customer
  taskTag: TagForTasks
  lawsuitEvent: Event | null
  lawsuit?: LawsuitForm | null
}

export type TaskPartialChangePayload = {
  id: number
  toDoDate?: string | null
  isImportant?: boolean
  includeInReport?: boolean
}

export type TaskCreatePayload = {
  theme: string
  deadline: string
  taskTagId: number
  isImportant?: boolean
  cost: null | string
  comment: null | string
  customerId: null | number
  lawsuitId: null | number
}

export type TaskChangePayload = TaskCreatePayload & {
  id: number
  lawsuitEventId: number | null
}

export type TaskTableTabs = 'Мой день' | 'Запланировано' | 'Архив'

export type TagForTasks = {
  id: number | null
  name: string
  color: string
  createdAt: string | null
  updatedAt: string | null
}

export type TagForTasksResponse = {
  data: TagForTasks[]
}

export type TagForTaskResponse = {
  data: TagForTasks
  success: number
  error: string | null
}

export type TagForTasksForm = {
  id: number | null
}
