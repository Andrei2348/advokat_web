import { defineComponent, PropType, toRefs } from 'vue'
import {
  rightSwipeButtons,
  leftSwipeButtons,
  SwipeButton,
  SwipeButtons,
} from '@/config/buttonsMobileSwipeConfig'
import { taskReportButton } from '@/config/buttonsMobileSwipeConfig'

export default defineComponent({
  name: 'ButtonsMobileSwipe',
  props: {
    item: {
      type: Object as PropType<{
        id: number
        includeInReport?: boolean
        [key: string]: any
      }>,
      required: true,
    },
    placement: {
      type: String as PropType<keyof SwipeButtons>,
      required: true,
    },
    isTask: {
      type: Boolean,
      required: false,
    },
  },
  emits: [
    'editLawsuit',
    'deleteLawsuit',
    'deleteLawsuit',
    'openClient',
    'removeClient',
    'completeTask',
    'addTaskToTheDay',
    'removeTask',
    'removeTaskFromReport',
    'addTaskToReport',
    'editAuthority',
    'removeAuthority',
    'removeEventsSettings',
    'removeCategorySettings',
    'removeTaskTag',
    'removeTransaction',
  ],
  setup(props, { emit }) {
    const { item } = toRefs(props)

    const buttonHandlers = {
      editLawsuit: () => emit('editLawsuit', item.value),
      deleteLawsuit: () => emit('deleteLawsuit', item.value.id),
      openClient: () => emit('openClient', item.value.id),
      deleteClient: () => emit('removeClient', item.value.id),
      completeTask: () => emit('completeTask'),
      addTaskToTheDay: () => emit('addTaskToTheDay', item.value.id),
      deleteTask: () => emit('removeTask', item.value.id),
      deleteTaskFromReport: () => emit('removeTaskFromReport', item.value.id),
      addTaskToReport: () => emit('addTaskToReport', item.value.id),
      editAuthority: () => emit('editAuthority', item.value.id),
      removeAuthority: () => emit('removeAuthority', item.value.id),
      deleteEventSettings: () => emit('removeEventsSettings', item.value.id),
      deleteCategorySettings: () =>
        emit('removeCategorySettings', item.value.id),
      deleteTaskTag: () => emit('removeTaskTag', item.value.id),
      deleteTransaction: () => emit('removeTransaction', item.value.id),
    }

    const handlers: { [key: string]: any } = {
      lawsuit: {
        edit: buttonHandlers.editLawsuit,
        remove: buttonHandlers.deleteLawsuit,
      },
      client: {
        open: buttonHandlers.openClient,
        remove: buttonHandlers.deleteClient,
      },
      task: {
        complete: buttonHandlers.completeTask,
        bookmark: buttonHandlers.addTaskToTheDay,
        remove: buttonHandlers.deleteTask,
        removeFromReport: buttonHandlers.deleteTaskFromReport,
        addToReport: buttonHandlers.addTaskToReport,
      },
      authorities: {
        edit: buttonHandlers.editAuthority,
        remove: buttonHandlers.removeAuthority,
      },
      eventSettings: {
        remove: buttonHandlers.deleteEventSettings,
      },
      categorySettings: {
        remove: buttonHandlers.deleteCategorySettings,
      },
      taskTagSettings: {
        remove: buttonHandlers.deleteTaskTag,
      },
      finance: {
        remove: buttonHandlers.deleteTransaction,
      },
    }

    const writeHandlers = (buttonsArray: SwipeButton[] | []) => {
      return buttonsArray.map((btn) => ({
        ...btn,
        handler: handlers[props.placement][btn.action],
      }))
    }

    const swipeButtonsKey = () => {
      if (props.placement !== 'task') {
        return props.placement
      }

      return props.isTask ? props.placement : 'event'
    }

    const rightSwipeBtnsOnPage = writeHandlers(
      rightSwipeButtons[swipeButtonsKey()],
    )

    const leftSwipeBtnsOnPage = writeHandlers(
      props.placement !== 'task'
        ? leftSwipeButtons[props.placement]
        : [
            ...leftSwipeButtons[props.placement],
            taskReportButton(props.item.includeInReport as boolean),
          ],
    )

    return {
      rightSwipeBtnsOnPage,
      leftSwipeBtnsOnPage,
    }
  },
})
