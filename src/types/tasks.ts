import { StatusType } from './lawsuit'

export type TaskChangeForm = {
  id: number
  status: StatusType
}

export type TaskChangeFormResponse = {
  success: number
  data: TaskData
  error: string | null
}

export type TaskData = {
  id: number
  theme: string
  is_important: boolean
  status: string
  deadline: string
  to_do_date: string
  cost: number | null
  comment: string | null
  created_at: string
  updated_at: string
}

export type TaskPartialChangeForm = {
  id: number
  toDoDate?: string
  isImportant?: boolean
  includeInReport?: boolean
}

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
