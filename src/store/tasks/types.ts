import { DefaultError } from '@/types/httpError'
import {
  Task,
  TaskSearchPayload,
  TaskSearchData,
  TaskStatusChangePayload,
  TaskPartialChangePayload,
  PartialTask,
} from '@/types/tasks'

export type RootState = {
  allTasks: TaskSearchData | null
  selectedTask: Task | null
  errorFields: DefaultError['error'] | null
  changeStatusResponse: boolean
  currentPage: number
  lastPage: number
  searchParams: TaskSearchPayload | null
}

export type RootGetters = {
  test: (state: RootState) => () => void
}

export type RootActions = {
  setError: (error: DefaultError['error']) => void
  getTasks: (params?: TaskSearchPayload) => Promise<void>
  changeTaskStatus: (params?: TaskStatusChangePayload) => Promise<void>
  changePartiallyTask: (params?: TaskPartialChangePayload) => Promise<void>
  deleteTask: (params?: Partial<TaskPartialChangePayload>) => Promise<void>
  loadMoreTasks: (params: any) => Promise<void>
  replaceTask: (newTask?: PartialTask, removeTaskId?: number) => void
  openRemoveModal: (id: number) => void
  openForm: () => void
  setSelectedTask: (task: Task) => void
  resetSelectedTask: () => void
}
