import { defineComponent, PropType, computed, ref } from 'vue'
import { useUXUIStore } from '@/store/uxui'
import { useNotesStore } from '@/store/notes'
import { useLawsuitStore } from '@/store/lawsuite'
import { useMainStore } from '@/store/main'
import { modalsContent } from '@/config/deleteModalsConfig'
import { LawsuitForm, LawsuitPartialFormObject } from '@/types/lawsuit'
import { getFormatDate, getDaysUntilToday } from '@/helpers/dateFormatter'
import setStartData from '@/helpers/setLawsuitObjectData'
import { useSwipe } from '@/composables/useSwipe'

export default defineComponent({
  name: 'LawsuitItem',
  props: {
    item: {
      type: Object as PropType<LawsuitForm>,
      required: true,
    },
    class: {
      type: Object,
    },
  },
  setup(props) {
    const uxuiStore = useUXUIStore()
    const notesStore = useNotesStore()
    const lawsuitStore = useLawsuitStore()
    const mainStore = useMainStore()
    const showInfoFlag = ref(false)
    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)

    const toggleNotesPanelHandler = (item: Record<string, any>) => {
      uxuiStore.switchNotesPanel()
      notesStore.setSelectedLawsuitId(item.id)
      notesStore.setSelectedLawsuitCustomerId(item.customer.id)
    }

    const deleteLawsuit = (id: number): void => {
      resetPosition()
      uxuiStore.setModalName('ConfirmationDelete')
      uxuiStore.setModalContent(modalsContent[0], id)
    }

    const editLawsuit = (item: LawsuitForm): void => {
      resetPosition()
      setStartData(props.item, lawsuitStore)
      lawsuitStore.setSelectedLawsuit(item)
      uxuiStore.setModalName('EditLawsuit', 3)
    }

    const dataChanged = (objKey: string, value: number): void => {
      setStartData(props.item, lawsuitStore)
      lawsuitStore.setSelectedLawsuitData(objKey, value)
      if (lawsuitStore.selectedLawsuitData) {
        lawsuitStore.setChangeLawsuit()
      }
    }

    const createMenuItems = (item: string) => [
      {
        id: 1,
        title: 'Редактировать',
        color: '',
        function: 'editLawsuit',
      },
      {
        id: 2,
        title: item === 'planned' ? 'Завершить' : 'Восстановить',
        color: '',
        function: 'finishLawsuit',
      },
      {
        id: 3,
        title: 'Удалить',
        color: '#F03810',
        function: 'deleteLawsuit',
      },
    ]

    const finishLawsuit = (item: LawsuitPartialFormObject) => {
      item.status = item.status === 'planned' ? 'finished' : 'planned'
      lawsuitStore.setPartialChangeLawsuit(item)
    }

    const displayDaysDifference = computed(() => {
      if (
        !props.item.lawsuitEvents ||
        props.item.lawsuitEvents.length === 0 ||
        !props.item.lawsuitEvents[props.item.lawsuitEvents.length - 1].till
      ) {
        return ''
      }

      const result = getDaysUntilToday(
        props.item.lawsuitEvents[props.item.lawsuitEvents.length - 1].till ||
          '',
      )
      return result ? result : ''
    })

    const toggleBottomShowPanelHandler = () => {
      showInfoFlag.value = !showInfoFlag.value
    }

    return {
      toggleNotesPanelHandler,
      deleteLawsuit,
      editLawsuit,
      dataChanged,
      getFormatDate,
      getDaysUntilToday,
      displayDaysDifference,
      finishLawsuit,
      createMenuItems,
      showInfoFlag,
      toggleBottomShowPanelHandler,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
    }
  },
})
