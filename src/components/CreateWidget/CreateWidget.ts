import { defineComponent, ref, watch } from 'vue'
import { Position } from '@/types/createWidget'
import { menuItems } from '@/config/createWidgetConfig'
import { useUXUIStore } from '@/store/uxui'
import { useLawsuitStore } from '@/store/lawsuite'
import { LawsuitEmptyObject } from '@/config/lawsuitTableHeadConfig'

export default defineComponent({
  name: 'CreateWidget',
  setup() {
    const uxuiStore = useUXUIStore()
    const lawsuitStore = useLawsuitStore()
    const menuOpen = ref<boolean>(false)
    const position = ref<Position>({ x: 52, y: 32 })
    const dragging = ref<boolean>(false)
    const offset = ref<Position>({ x: 52, y: 32 })

    const startDrag = (event: MouseEvent): void => {
      dragging.value = true
      offset.value = {
        x: -(event.clientX + position.value.x),
        y: -(event.clientY + position.value.y),
      }
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    const onDrag = (event: MouseEvent): void => {
      if (dragging.value) {
        position.value = {
          x: -(event.clientX + offset.value.x),
          y: -(event.clientY + offset.value.y),
        }
      }
    }

    const stopDrag = () => {
      dragging.value = false
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
      menuOpen.value = true
    }

    const createLawsuit = () => {
      lawsuitStore.setSelectedLawsuitDataObject({ ...LawsuitEmptyObject })
      lawsuitStore.setSelectedLawsuit(null)
      uxuiStore.setModalName('EditLawsuit', 3)
    }
    // ====================

    watch(
      [dragging, position],
      ([newParam1, newParam2], [oldParam1, oldParam2]) => {
        if (
          newParam1 &&
          JSON.stringify(oldParam2) != JSON.stringify(newParam2)
        ) {
          console.log(oldParam1)
          menuOpen.value = false
        }
      },
      { deep: true },
    )

    return {
      menuOpen,
      startDrag,
      onDrag,
      stopDrag,
      position,
      menuItems,
      dragging,
      createLawsuit,
    }
  },
})
