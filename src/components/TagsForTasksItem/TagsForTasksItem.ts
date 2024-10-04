import { defineComponent, PropType, ref, watch } from 'vue'
import { TagForTasks } from '@/types/tasks'
import { useTasksStore } from '@/store/tasks'
import { useMainStore } from '@/store/main'
import { useUXUIStore } from '@/store/uxui'
import { useSwipe } from '@/composables/useSwipe'
import { modalsContent } from '@/config/deleteModalsConfig'

export default defineComponent({
  name: 'TagsForTasksItem',
  props: {
    item: {
      type: Object as PropType<TagForTasks>,
      required: true,
    },
  },
  setup(props) {
    const tasksStore = useTasksStore()
    const mainStore = useMainStore()
    const uxuiStore = useUXUIStore()
    const selectedItem = ref<TagForTasks | null>(props.item)
    const { onTouchStart, onTouchMove, onTouchEnd, position, resetPosition } =
      useSwipe(mainStore.isMobile)

    const setTagByKey = <K extends keyof TagForTasks>(
      key: K,
      value: TagForTasks[K],
    ): void => {
      if (selectedItem.value && key in selectedItem.value) {
        ;(selectedItem.value as Record<string, unknown>)[key] = value
      }
    }

    const setTagName = (value: string) => {
      setTagByKey('name', value)
    }

    const changeColor = (value: string) => {
      setTagByKey('color', value)
    }

    const deleteLawsuitHandler = (id: number | null) => {
      resetPosition()
      if (id !== null) {
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent[6], id)
      } else {
        tasksStore.deleteTagsForTasks({ id })
      }
    }

    watch(
      () => selectedItem.value,
      (newValue) => {
        if (newValue && newValue.name && newValue.color) {
          tasksStore.saveTagObject(newValue)
        }
      },
      { deep: true },
    )

    return {
      setTagName,
      changeColor,
      tasksStore,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      position,
      resetPosition,
      deleteLawsuitHandler,
    }
  },
})
