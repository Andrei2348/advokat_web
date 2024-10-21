import {
  defineComponent,
  ref,
  reactive,
  watch,
  onMounted,
  onUnmounted,
  computed,
} from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useTasksStore } from '@/store/tasks'
import { useClientsStore } from '@/store/client'
import { useLawsuitStore } from '@/store/lawsuite'
import { useTagsStore } from '@/store/tags'
import { useUXUIStore } from '@/store/uxui'
import { createTaskApiCall, changeTaskApiCall } from '@/api/tasks'
import { useApiCall } from '@/composables/useApiCall'
import {
  getTimezoneDate,
  getHour,
  getFormatDateWithDash,
  checkDateValidity,
} from '@/helpers/dateFormatter'
import { Error } from '@/types/httpError'
import { Event } from '@/types/lawsuit'
import {
  Task,
  TaskResponse,
  TaskCreatePayload,
  TaskChangePayload,
} from '@/types/tasks'

export default defineComponent({
  name: 'TaskForm',
  setup() {
    type IdType = {
      id: string
    }
    type TaskFormFields = {
      theme: string
      isImportant: boolean
      date: string
      time: string
      cost: string
      tag: IdType
      customer: IdType
      lawsuit: IdType
      comment: string
    }

    const fields = reactive<TaskFormFields>({
      theme: '',
      isImportant: false,
      date: '',
      time: '',
      cost: '',
      tag: {
        id: '',
      },
      customer: {
        id: '',
      },
      lawsuit: {
        id: '',
      },
      comment: '',
    })
    const validationErrors = ref<
      { [K in keyof TaskFormFields]?: string[] } | null
    >(null)
    const isTaskNew = ref(true)
    const taskId = ref<number | null>(null)
    const taskStatus = ref<{ [key: string]: string } | null>(null)
    const previousLawsuitId = ref('')
    const selectedCustomerId = ref('')
    const lawsuitEvent = ref<Event | null>()
    const tasksStore = useTasksStore()
    const tagsStore = useTagsStore()
    const clientsStore = useClientsStore()
    const lawsuitStore = useLawsuitStore()
    const uxuiStore = useUXUIStore()
    const router = useRouter()

    const selectedTask = tasksStore.selectedTask
    if (selectedTask) {
      isTaskNew.value = false
      taskId.value = selectedTask.id
      fields.theme = selectedTask.theme
      fields.isImportant = selectedTask.isImportant
      taskStatus.value = {
        [selectedTask.status]:
          selectedTask.status === 'planned' ? 'Запланирована' : 'Выполнена',
      }

      const dateAndTime = getTimezoneDate(selectedTask.deadline)
      fields.date = dateAndTime.date
      fields.time = dateAndTime.time ?? ''
      fields.cost = String(selectedTask.cost) ?? ''
      fields.tag = { id: String(selectedTask.taskTag?.id) ?? '' }
      fields.customer = {
        id: selectedTask.customer ? String(selectedTask.customer.id) : '',
      }
      selectedCustomerId.value = fields.customer.id
      fields.lawsuit = {
        id: selectedTask.lawsuit ? String(selectedTask.lawsuit.id) : '',
      }
      previousLawsuitId.value = selectedTask.lawsuit
        ? String(selectedTask.lawsuit.id)
        : ''
      fields.comment = selectedTask.comment ?? ''
      lawsuitEvent.value = selectedTask.lawsuitEvent
    }

    if (
      isTaskNew.value &&
      router.currentRoute.value.name === 'clients' &&
      !clientsStore.isTableShown &&
      clientsStore.selectedClient
    ) {
      fields.customer.id = String(clientsStore.selectedClient.id)
    }

    if (
      isTaskNew.value &&
      router.currentRoute.value.name === 'lawsuit-details'
    ) {
      fields.lawsuit.id = String(lawsuitStore.selectedLawsuitData?.id)
    }

    const selectTagOptions = computed(() => tagsStore.tagsList ?? [])
    const selectClientOptions = computed(() => clientsStore.allClients.data)
    const selectLawsuitOptions = computed(() => {
      if (selectedCustomerId.value && lawsuitStore.lawsuitData) {
        return lawsuitStore.lawsuitData?.filter(
          (item) => String(item.customer.id) === selectedCustomerId.value,
        )
      }
      return lawsuitStore.lawsuitData ?? []
    })
    const selectInitialValues = computed(() => {
      const tag = selectTagOptions.value.find(
        (tag) => tag.id === Number(fields.tag.id),
      )
      const client = selectClientOptions.value.find(
        (client) => client.id === Number(fields.customer.id),
      )
      const lawsuit = selectLawsuitOptions.value?.find(
        (lawsuit) => lawsuit.id === Number(fields.lawsuit.id),
      )
      return { tag, client, lawsuit }
    })
    const isSubmitBtnDisabled = computed(
      () => !fields.theme || !checkDateValidity(fields.date) || !fields.tag.id,
    )
    const validation = computed(() => ({
      time:
        fields.time.length < 5 ||
        (fields.time.length === 5 &&
          !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(fields.time)),
    }))

    const { executeApiCall: createTask, error: newTaskError } = useApiCall<
      TaskResponse<Task>,
      Error,
      TaskCreatePayload
    >(createTaskApiCall, true)

    const {
      data: changeTaskData,
      executeApiCall: changeTask,
      error: changeTaskError,
    } = useApiCall<TaskResponse<Task>, Error, TaskChangePayload>(
      changeTaskApiCall,
      true,
    )

    watch(
      () => validation.value.time,
      (nevVal) => {
        if (!nevVal) {
          validationErrors.value = null
          return
        }
        validationErrors.value = { time: ['Некорректное время'] }
      },
    )

    watch(
      () => router.currentRoute.value.name,
      () => {
        closeModalForm()
      },
    )

    const onValueChange = (objKey: keyof TaskFormFields, value: any) => {
      if (typeof value === 'number') {
        if (objKey === 'lawsuit') {
          const lawsuit = lawsuitStore.lawsuitData?.find(
            (item) => item.id === value,
          )
          if (lawsuit) {
            fields.customer.id = String(lawsuit.customer.id)
          }
        }
        if (objKey === 'customer') {
          selectedCustomerId.value = String(value)
        }
        ;(fields as any)[objKey] = { id: value }
        return
      } else if (typeof value === 'undefined') {
        ;(fields as any)[objKey] = ''
        return
      }

      ;(fields as any)[objKey] = value
    }

    const closeModalForm = () => {
      uxuiStore.setModalName('')
    }

    const handleCreateNewTask = async () => {
      validationErrors.value = null
      const taskBody = {
        theme: fields.theme,
        isImportant: fields.isImportant,
        deadline: `${getFormatDateWithDash(fields.date)} ${fields.time}`,
        cost: fields.cost ? fields.cost.replace(/\s+/g, '') : null,
        taskTagId: Number(fields.tag.id),
        customerId: fields.customer.id ? Number(fields.customer.id) : null,
        lawsuitId: fields.lawsuit.id ? Number(fields.lawsuit.id) : null,
        comment: fields.comment,
      }

      try {
        await createTask(taskBody)
        await tasksStore.getTasks()
        closeModalForm()
      } catch (error) {
        if (newTaskError.value?.data.errors) {
          validationErrors.value = newTaskError.value?.data.errors
        }
      }
    }

    const handleChangeTask = async () => {
      validationErrors.value = null
      const taskBody = {
        id: taskId.value as number,
        theme: fields.theme,
        isImportant: fields.isImportant,
        deadline: `${getFormatDateWithDash(fields.date)} ${fields.time}`,
        cost: fields.cost ? fields.cost.replace(/\s+/g, '') : null,
        taskTagId: Number(fields.tag.id),
        customerId: fields.customer.id ? Number(fields.customer.id) : null,
        lawsuitId: fields.lawsuit.id ? Number(fields.lawsuit.id) : null,
        comment: fields.comment,
        lawsuitEventId: lawsuitEvent.value?.id
          ? Number(fields.customer.id)
          : null,
      }
      try {
        await changeTask(taskBody)
        if (changeTaskData.value?.data) {
          tasksStore.replaceTask(changeTaskData.value?.data)
        }
        closeModalForm()
      } catch (error) {
        if (changeTaskError.value?.data.errors) {
          validationErrors.value = changeTaskError.value?.data.errors
        }
      }
    }

    const submitHandler = computed(() =>
      isTaskNew.value ? handleCreateNewTask : handleChangeTask,
    )

    const onCompleteBtnClick = async () => {
      if (!selectedTask) return

      try {
        await tasksStore.changeTaskStatus({
          id: selectedTask?.id,
          status: 'finished',
        })
        taskStatus.value = { finished: 'Выполнена' }
      } catch (error) {
        console.error(error)
      }
    }

    const onDeleteTaskBtnClick = () => {
      if (selectedTask) {
        tasksStore.openRemoveModal(selectedTask?.id)
      }
    }

    onMounted(async () => {
      await tagsStore.getTagsForTasksList()
      await clientsStore.getClients()
      await lawsuitStore.getLawsuitList()
    })

    onUnmounted(() => {
      if (!isTaskNew.value) {
        tasksStore.resetSelectedTask()
      }
    })

    return {
      RouterLink,
      fields,
      lawsuitEvent,
      validationErrors,
      isTaskNew,
      isSubmitBtnDisabled,
      taskStatus,
      previousLawsuitId,
      validation,
      getHour,
      tasksStore,
      onValueChange,
      selectTagOptions,
      selectClientOptions,
      selectLawsuitOptions,
      selectInitialValues,
      submitHandler,
      onCompleteBtnClick,
      onDeleteTaskBtnClick,
    }
  },
})
