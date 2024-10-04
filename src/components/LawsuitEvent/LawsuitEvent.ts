import { defineComponent, PropType, watch, ref, computed } from 'vue'
import { TaskEvent, StatusType } from '@/types/lawsuit'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { MenuItemDropdown } from '@/types/createWidget'
import { useUXUIStore } from '@/store/uxui'
import { useEventsStore } from '@/store/events'
import { useTasksStore } from '@/store/tasks'
import { useLawsuitStore } from '@/store/lawsuite'
import { useMainStore } from '@/store/main'
import { modalsContent } from '@/config/deleteModalsConfig'
import { getFullFormatDate, getDaysUntilToday } from '@/helpers/dateFormatter'
import { useRoute } from 'vue-router'
import { SelectedPlan } from '@/types/lawsuit'
import { useSwipe } from '@/composables/useSwipe'

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.locale('ru')

export default defineComponent({
  name: 'LawsuitEvent',
  props: {
    data: {
      type: Object as PropType<TaskEvent>,
      required: true,
    },
    sign: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const uxuiStore = useUXUIStore()
    const eventsStore = useEventsStore()
    const tasksStore = useTasksStore()
    const mainStore = useMainStore()
    const lawsuitStore = useLawsuitStore()
    const status = ref<StatusType>(
      props.data.event?.status || props.data.task?.status,
    )
    const route = useRoute()
    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)
    const isChecked = ref<boolean>(status.value === 'finished')
    const statusText = ref<string>(
      status.value === 'planned' ? 'Запланировано' : 'Выполнено',
    )
    const isImportant = ref<boolean>(
      props.data?.event?.isImportant || props.data?.task?.isImportant,
    )

    const lawsuitItemsMenu: MenuItemDropdown[] = [
      {
        id: 1,
        title: 'Создать связанное событие',
        // Удалить связанное событие'
        color: '',
        function: '',
      },
      {
        id: 2,
        title: props.data?.event
          ? props.data?.event.isAllDay
            ? 'Удалить из моего дня'
            : 'Добавить в мой день'
          : '',
        color: '',
        function: '',
      },
      {
        id: 3,
        title:
          props.data?.task?.includeInReport ||
          props.data?.event?.includeInReport
            ? 'Исключить из акта'
            : 'Добавить в акт',
        color: '',
        function: '',
      },
      {
        id: 4,
        title: 'Удалить',
        color: '#F03810',
        function: 'deleteEventTask',
      },
    ]

    const changeStatus = (newValue: boolean) => {
      status.value = newValue ? 'finished' : 'planned'
      if (props.data.event && props.data.event.id) {
        eventsStore.setEventsStatus({
          id: props.data.event.id,
          status: status.value,
        })
      } else if (props.data.task && props.data.task.id) {
        tasksStore.setTasksStatus({
          id: props.data.task.id,
          status: status.value,
        })
      }
    }

    const changeImportance = () => {
      if (props.data.event && props.data.event.id) {
        eventsStore.setPartialEventsChange({
          id: props.data.event.id,
          isImportant: !isImportant.value,
        })
      } else if (props.data.task && props.data.task.id) {
        tasksStore.setPartialTasksChange({
          id: props.data.task.id,
          isImportant: !isImportant.value,
        })
      }
      isImportant.value = !isImportant.value
    }

    const deleteEventTask = (
      eventId: number | null,
      type: SelectedPlan,
    ): void => {
      uxuiStore.setTypeOfSelectedPlan(type)
      if (eventId !== null && typeof eventId === 'number') {
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent[3], eventId)
      }
    }

    watch(
      [
        () => eventsStore.changeStatusResponse,
        () => tasksStore.changeStatusResponse,
      ],
      () => {
        lawsuitStore.getLawsuitEvents({ id: Number(route.params.id) })
      },
    )

    const displayDaysDifference = computed(() => {
      let result: string | null = null
      if (props.data.event) {
        result = getDaysUntilToday(props.data.event.till)
      } else if (props.data.task) {
        result = getDaysUntilToday(props.data.task.deadline)
      }
      return result ? result : ''
    })

    watch(isChecked, (newValue) => {
      changeStatus(newValue)
    })

    return {
      getFullFormatDate,
      isChecked,
      status,
      statusText,
      lawsuitItemsMenu,
      changeImportance,
      isImportant,
      displayDaysDifference,
      deleteEventTask,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      changeStatus
    }
  },
})
