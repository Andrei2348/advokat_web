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
  ],
  setup(props, { emit }) {
    const { item } = toRefs(props)

    const editLawsuitHandler = () => {
      emit('editLawsuit', item.value)
    }

    const deleteLawsuitHandler = () => {
      emit('deleteLawsuit', item.value.id)
    }

    const openClientHandler = () => {
      emit('openClient', item.value.id)
    }

    const deleteClientHandler = () => {
      emit('removeClient', item.value.id)
    }

    const completeTask = () => {
      emit('completeTask')
    }

    const addTaskToTheDay = () => {
      emit('addTaskToTheDay', item.value.id)
    }

    const deleteTask = () => {
      emit('removeTask', item.value.id)
    }

    const deleteTaskFromReport = () => {
      emit('removeTaskFromReport', item.value.id)
    }

    const addTaskToReport = () => {
      emit('addTaskToReport', item.value.id)
    }

    const editAuthority = () => {
      emit('editAuthority', item.value.id)
    }

    const removeAuthority = () => {
      emit('removeAuthority', item.value.id)
    }

    const deleteEventSettings = () => {
      emit('removeEventsSettings', item.value.id)
    }

    const deleteCategorySettings = () => {
      emit('removeCategorySettings', item.value.id)
    }

    const deleteTaskTag = () => {
      emit('removeTaskTag', item.value.id)
    }

    const handlers: { [key: string]: any } = {
      lawsuit: {
        edit: editLawsuitHandler,
        remove: deleteLawsuitHandler,
      },
      client: {
        open: openClientHandler,
        remove: deleteClientHandler,
      },
      task: {
        complete: completeTask,
        bookmark: addTaskToTheDay,
        remove: deleteTask,
        removeFromReport: deleteTaskFromReport,
        addToReport: addTaskToReport,
      },
      authorities: {
        edit: editAuthority,
        remove: removeAuthority,
      },
      eventSettings: {
        remove: deleteEventSettings,
      },
      categorySettings: {
        remove: deleteCategorySettings,
      },
      taskTagSettings: {
        remove: deleteTaskTag,
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
      editLawsuitHandler,
      deleteLawsuitHandler,
      openClientHandler,
      deleteClientHandler,
    }
  },
})
