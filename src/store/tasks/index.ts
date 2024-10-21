import { defineStore } from 'pinia'
import { DefaultError } from '@/types/httpError'
import { useApiCall } from '@/composables/useApiCall'
import { useUXUIStore } from '../uxui'
import { modalsContent } from '@/config/deleteModalsConfig'
import {
  getTasksApiCall,
  taskChangeStatusApiCall,
  taskPartialChangeApiCall,
  deleteTaskApiCall,
} from '@/api/tasks'
import {
  PartialTask,
  Task,
  TaskSearchPayload,
  TaskSearchData,
  TaskStatusChangePayload,
  TaskPartialChangePayload,
  TaskResponse,
} from '@/types/tasks'
import { RootState, RootGetters, RootActions } from './types'

export const useTasksStore = defineStore<
  string,
  RootState,
  RootGetters,
  RootActions
>('tasks', {
  state: () => {
    return {
      allTasks: null,
      selectedTask: null,
      errorFields: null,
      changeStatusResponse: false,
      currentPage: 1,
      lastPage: 1,
      searchParams: null,
    }
  },
  getters: {
    test: (state: RootState) => {
      return () => console.log(state.errorFields)
    },
  },
  actions: {
    setError(error: DefaultError['error']) {
      this.errorFields = error
    },
    async getTasks(params?: TaskSearchPayload) {
      const {
        data: allTasks,
        executeApiCall: getAllTasks,
        error: allTasksError,
      } = useApiCall<TaskSearchData, DefaultError, TaskSearchPayload>(
        getTasksApiCall,
        true,
      )

      if (params) {
        this.searchParams = params
      }

      try {
        await getAllTasks(params)
        if (allTasks.value) {
          this.lastPage = allTasks.value.meta.lastPage
          if (this.currentPage === 1) {
            this.allTasks = allTasks.value
          } else {
            if (Array.isArray(this.allTasks?.data)) {
              this.allTasks = {
                data: [...this.allTasks.data, ...allTasks.value.data],
                links: allTasks.value.links,
                meta: allTasks.value.meta,
              }
            }
          }
        }
      } catch (error) {
        if (allTasksError.value?.data.error) {
          this.setError(allTasksError.value?.data.error)
        }
      }
    },
    async loadMoreTasks() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++
        let newParams = { page: this.currentPage }
        if (this.searchParams) {
          newParams = { ...this.searchParams, ...newParams }
        }

        await this.getTasks(newParams)
      }
    },
    async changeTaskStatus(params?: TaskStatusChangePayload) {
      const {
        data: changeTaskData,
        executeApiCall: setTaskStatus,
        error: taskError,
      } = useApiCall<TaskResponse<Task>, DefaultError, TaskStatusChangePayload>(
        taskChangeStatusApiCall,
        true,
      )

      try {
        await setTaskStatus(params)
        if (changeTaskData.value?.data) {
          this.replaceTask(changeTaskData.value?.data)
        }
        this.changeStatusResponse = !this.changeStatusResponse
      } catch (error) {
        if (taskError.value?.data.error) {
          this.setError(taskError.value?.data.error)
        }
      }
    },
    async changePartiallyTask(params?: TaskPartialChangePayload) {
      const {
        data: partialChangeTaskData,
        executeApiCall: changePartiallyTask,
        error: partialTaskError,
      } = useApiCall<
        TaskResponse<Task>,
        DefaultError,
        TaskPartialChangePayload
      >(taskPartialChangeApiCall, true)

      try {
        await changePartiallyTask(params)
        if (partialChangeTaskData.value?.data) {
          this.replaceTask(partialChangeTaskData.value?.data)
        }
      } catch (error) {
        if (partialTaskError.value?.data.error) {
          this.setError(partialTaskError.value?.data.error)
        }
      }
    },
    async deleteTask(params?: Partial<TaskPartialChangePayload>) {
      const { executeApiCall: deleteTask, error: deleteTaskError } = useApiCall<
        TaskResponse<''>,
        DefaultError,
        Partial<TaskPartialChangePayload>
      >(deleteTaskApiCall, true)

      try {
        await deleteTask(params)
        this.changeStatusResponse = !this.changeStatusResponse
        this.replaceTask(undefined, params?.id)
      } catch (error) {
        if (deleteTaskError.value?.data.error) {
          this.setError(deleteTaskError.value?.data.error)
        }
      }
    },
    replaceTask(newTaskObject?: PartialTask, removeTaskId?: number) {
      if (!this.allTasks) {
        return
      }

      if (newTaskObject) {
        const taskIndex = this.allTasks?.data.findIndex(
          (task: Task) => task.id === newTaskObject.id,
        )
        if (taskIndex !== undefined && this.allTasks.data) {
          this.allTasks.data[taskIndex] = {
            ...this.allTasks.data[taskIndex],
            ...newTaskObject,
          }
        }
      } else {
        this.allTasks.data = this.allTasks.data.filter(
          (task) => task.id !== removeTaskId,
        )
      }
    },

    openRemoveModal(id: number) {
      const uxuiStore = useUXUIStore()
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent['task'], id)
    },
    openForm() {
      const uxuiStore = useUXUIStore()
      uxuiStore.setModalName('TaskForm', 6)
    },
    setSelectedTask(task: Task) {
      this.selectedTask = task
    },
    resetSelectedTask() {
      this.selectedTask = null
    },
  },
})
