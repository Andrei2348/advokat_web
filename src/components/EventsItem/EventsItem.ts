import { defineComponent, PropType, watch, ref } from 'vue'
import { eventsItems } from '@/config/eventsTable'
import { EventCategory, OptionsItem } from '@/types/events'
import { useEventsStore } from '@/store/events'
import { useMainStore } from '@/store/main'
import { useUXUIStore } from '@/store/uxui'
import { useSwipe } from '@/composables/useSwipe'
import { modalsContent } from '@/config/deleteModalsConfig'

export default defineComponent({
  name: 'EventsItem',
  props: {
    item: {
      type: Object as PropType<EventCategory>,
      required: true,
    },
    hoursOptions: {
      type: Array as PropType<OptionsItem[]>,
      required: true,
    },
    daysOptions: {
      type: Array as PropType<OptionsItem[]>,
      required: true,
    },
  },
  emits: ['deleteEventsTask'],
  setup(props) {
    const mainStore = useMainStore()
    const uxuiStore = useUXUIStore()
    const eventsStore = useEventsStore()
    const selectedItem = ref<EventCategory | null>(props.item)
    const isCheckedBillable = ref<boolean>(props.item.isBillable)
    const selectedType = ref<string | null>(props.item.type)

    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)

    const setEventValueByKey = <K extends keyof EventCategory>(
      key: K,
      value: EventCategory[K],
    ) => {
      if (selectedItem.value) {
        selectedItem.value[key] = value
      }
    }

    const setStartValue = (
      value: number | null,
      objectOfValues: OptionsItem[],
    ) => {
      if (value === null) {
        return objectOfValues[0]
      }
      return objectOfValues[value]
    }

    const changeStatusBillable = (newValue: boolean) => {
      isCheckedBillable.value = newValue
      setEventValueByKey('isBillable', newValue)
    }

    const setEventName = (value: string) => {
      setEventValueByKey('name', value)
    }

    const changeColor = (value: string) => {
      setEventValueByKey('color', value)
    }

    const notifyBeforeHandler = (key: keyof EventCategory, value: number) => {
      if (value === 1) {
        setEventValueByKey(key, null)
      } else {
        setEventValueByKey(key, value - 1)
      }
    }

    const deleteEventHandler = (id: number | null) => {
      resetPosition()
      if (id !== null) {
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent[4], id)
      } else {
        eventsStore.setDeleteEventsTypeById({ id })
      }
    }

    watch(isCheckedBillable, (newValue) => {
      changeStatusBillable(newValue)
    })

    watch(selectedType, (newValue) => {
      if (newValue) {
        setEventValueByKey('type', newValue)
      }
    })

    watch(
      () => selectedItem.value,
      (newValue) => {
        if (newValue && newValue.name && newValue.color) {
          eventsStore.saveEventsTypesObject(newValue)
        }
      },
      { deep: true },
    )

    return {
      selectedItem,
      eventsItems,
      setStartValue,
      setEventValueByKey,
      setEventName,
      notifyBeforeHandler,
      isCheckedBillable,
      selectedType,
      changeColor,
      eventsStore,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      uxuiStore,
      deleteEventHandler,
    }
  },
})
