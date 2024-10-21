import { defineComponent, PropType, ref, watch } from 'vue'
import { LawsuitCategory } from '@/types/lawsuit'
import { EventCategory, OptionsItem } from '@/types/events'
import { useLawsuitStore } from '@/store/lawsuite'
import { useMainStore } from '@/store/main'
import { useUXUIStore } from '@/store/uxui'
import { useSwipe } from '@/composables/useSwipe'
import { modalsContent } from '@/config/deleteModalsConfig'

export default defineComponent({
  name: 'CaseItem',
  props: {
    item: {
      type: Object as PropType<LawsuitCategory>,
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
  setup(props) {
    const lawsuitStore = useLawsuitStore()
    const mainStore = useMainStore()
    const uxuiStore = useUXUIStore()
    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)
    const selectedItem = ref<LawsuitCategory | null>(props.item)

    const notifyBeforeHandler = (key: keyof EventCategory, value: number) => {
      if (value === 1) {
        setLawsuitCategoryByKey(key, null)
      } else {
        setLawsuitCategoryByKey(key, value - 1)
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

    const setLawsuitCategoryByKey = <K extends keyof EventCategory>(
      key: K,
      value: EventCategory[K],
    ): void => {
      if (selectedItem.value && key in selectedItem.value) {
        ;(selectedItem.value as Record<string, unknown>)[key] = value
      }
    }

    const setLawsuitCategoryName = (value: string) => {
      setLawsuitCategoryByKey('name', value)
    }

    const changeColor = (value: string) => {
      setLawsuitCategoryByKey('color', value)
    }

    const deleteLawsuitCategoryHandler = (id: number | null) => {
      if (id !== null) {
        resetPosition()
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent['lawsuitCategory'], id)
      } else {
        lawsuitStore.deleteLawsuitCategory({ id })
      }
    }

    watch(
      () => selectedItem.value,
      (newValue) => {
        if (newValue && newValue.name && newValue.color) {
          lawsuitStore.saveLawsuitCategoryObject(newValue)
        }
      },
      { deep: true },
    )

    return {
      lawsuitStore,
      notifyBeforeHandler,
      selectedItem,
      setStartValue,
      setLawsuitCategoryName,
      changeColor,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      deleteLawsuitCategoryHandler,
    }
  },
})
