import { defineComponent, PropType, watch, ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import TooltipComponent from '@/components/TooltipComponent/TooltipComponent.vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useUXUIStore } from '@/store/uxui'
import { useMainStore } from '@/store/main'
import { useEventsStore } from '@/store/events'
import { useTasksStore } from '@/store/tasks'
import { useSwipe } from '@/composables/useSwipe'
import {
  getFormatDate,
  getTimezoneDate,
  getDaysUntilToday,
  getHoursUntilDeadline,
} from '@/helpers/dateFormatter'
import { StatusType, Event } from '@/types/lawsuit'
import { Task } from '@/types/tasks'
import { MenuItemDropdown } from '@/types/createWidget'

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.locale('ru')

export default defineComponent({
  name: 'TaskEventItem',
  components: {
    TooltipComponent,
  },
  props: {
    data: {
      type: Object as PropType<Event | Task>,
      required: true,
    },
    isInTasks: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['onDelete'],
  setup(props, { emit }) {
    const uxuiStore = useUXUIStore()
    const mainStore = useMainStore()
    const eventsStore = useEventsStore()
    const tasksStore = useTasksStore()
    const isMobile = computed(() => mainStore.isMobile)

    const isTask = (data: Event | Task) => 'lawsuitEvent' in data
    const statusText = {
      planned: isTask(props.data) ? 'Запланирована' : 'Запланировано',
      finished: isTask(props.data) ? 'Выполнена' : 'Выполнено',
    }

    const status = ref<StatusType>(props.data.status)
    const isChecked = ref<boolean>(status.value === 'finished')
    const isImportant = ref<boolean>(props.data.isImportant)
    const tooltipsShown = ref({
      calendar: false,
      report: false,
      day: false,
    })

    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(isMobile.value)

    watch(
      () => props.data.status,
      (newStatus) => {
        isChecked.value = newStatus === 'finished'
      },
    )

    const itemsMenu: (item: Event | Task) => MenuItemDropdown[] = (
      item: Event | Task,
    ) => {
      const menuItems: MenuItemDropdown[] = []
      const isItemTask = 'lawsuitEvent' in item

      if (isItemTask) {
        menuItems.push(
          {
            title: !item.lawsuitEvent
              ? 'Создать связанное событие'
              : 'Удалить связанное событие',
            function: '',
          },
          {
            title: !item.toDoDate
              ? 'Добавить в мой день'
              : 'Удалить из моего дня',
            function: 'changeTaskDayPresence',
          },
          {
            title: item.status === 'planned' ? 'Выполнить задачу' : '',
            function: 'toggleIsChecked',
          },
        )
      }

      menuItems.push(
        {
          title: !item.includeInReport ? 'Добавить в акт' : 'Исключить из акта',
          function: 'changeReportPresence',
        },
        {
          title: 'Удалить',
          color: '#F03810',
          function: isItemTask ? 'deleteTask' : 'deleteEventTask',
        },
      )

      return menuItems
    }

    const getDateAndTime = () => {
      return getTimezoneDate(
        isTask(props.data) ? props.data.deadline : props.data.till,
      )
    }

    const changeStatus = async (newValue: boolean) => {
      status.value = newValue ? 'finished' : 'planned'
      if (isTask(props.data)) {
        await tasksStore.changeTaskStatus({
          id: props.data.id,
          status: status.value,
        })
      } else {
        eventsStore.setEventsStatus({
          id: props.data.id,
          status: status.value,
        })
      }
    }

    const changeImportance = async () => {
      if (isTask(props.data)) {
        await tasksStore.changePartiallyTask({
          id: props.data.id,
          isImportant: !isImportant.value,
        })
      } else {
        eventsStore.setPartialEventsChange({
          id: props.data.id,
          isImportant: !isImportant.value,
        })
      }
      isImportant.value = !isImportant.value
    }

    const changeReportPresence = async () => {
      if (isTask(props.data)) {
        await tasksStore.changePartiallyTask({
          id: props.data.id,
          includeInReport: !props.data.includeInReport,
        })
      } else {
        eventsStore.setPartialEventsChange({
          id: props.data.id,
          includeInReport: !props.data.includeInReport,
        })
      }
      resetPosition()
    }

    const changeTaskDayPresence = async () => {
      if (!isTask(props.data)) {
        return
      }
      const now = dayjs().toString()
      if (props.data.toDoDate) {
        await tasksStore.changePartiallyTask({
          id: props.data.id,
          toDoDate: null,
        })
      } else {
        await tasksStore.changePartiallyTask({
          id: props.data.id,
          toDoDate: getFormatDate(now),
        })
        if (tasksStore.errorFields && tasksStore.errorFields.error) {
          uxuiStore.openNotification('error', tasksStore.errorFields.error)
          return
        }
        uxuiStore.openNotification(
          'done',
          'Задача добавлена в список “Мой день”',
        )
      }
      resetPosition()
    }

    const toggleIsChecked = () => {
      isChecked.value = !isChecked.value
      resetPosition()
    }

    const onDeleteBtnClick = () => {
      emit('onDelete', props.data.id, isTask(props.data) ? 'task' : 'event')
      resetPosition()
    }

    const onTaskThemeClick = () => {
      if (isTask(props.data)) {
        tasksStore.openForm()
        tasksStore.setSelectedTask(props.data)
      }
    }

    const displayDaysDifference = computed(() => {
      let result: { text: string; difference: number } | null = null
      if (isTask(props.data)) {
        result = getDaysUntilToday(props.data.deadline)
      } else {
        result = getDaysUntilToday(props.data.till)
      }
      if (
        result?.difference &&
        result?.difference < 0 &&
        props.data.status === 'finished'
      ) {
        return ''
      }
      return result ? result : ''
    })

    const displayHoursDifference = computed(() => {
      let result: number | '' = ''
      if (isTask(props.data)) {
        result = getHoursUntilDeadline(
          props.data.createdAt,
          props.data.deadline,
        )
      } else {
        result = getHoursUntilDeadline(props.data.createdAt, props.data.till)
      }
      return typeof result === 'number' ? Math.abs(result) : result
    })

    watch(isChecked, (newValue) => {
      changeStatus(newValue)
    })

    return {
      isMobile,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      getDateAndTime,
      isChecked,
      tooltipsShown,
      isTask,
      status,
      statusText,
      itemsMenu,
      changeImportance,
      changeReportPresence,
      changeTaskDayPresence,
      isImportant,
      toggleIsChecked,
      displayHoursDifference,
      displayDaysDifference,
      onDeleteBtnClick,
      onTaskThemeClick,
    }
  },
})
