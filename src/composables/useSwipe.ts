import { ref, watch } from 'vue'
import { useUXUIStore } from '@/store/uxui'

export const useSwipe = (isPermission: boolean) => {
  const uxuiStore = useUXUIStore()
  const touchStartX = ref<number>(0)
  const touchEndX = ref<number>(0)
  const position = ref<number>(0)

  const isSwipeAllowed = ref<boolean>(isPermission && uxuiStore.swipePermission)

  watch(
    [() => uxuiStore.swipePermission, () => isPermission],
    ([newSwipePermission, newPermission]) => {
      isSwipeAllowed.value = newSwipePermission && newPermission
    },
  )

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.value = event.touches[0].clientX
  }

  const onTouchMove = (event: TouchEvent) => {
    touchEndX.value = event.touches[0].clientX
  }

  const onTouchEnd = () => {
    handleSwipe()
  }

  const handleSwipe = () => {
    const deltaX = touchEndX.value - touchStartX.value
    if (deltaX > 100) {
      if (position.value < 1 && isSwipeAllowed.value) {
        position.value += 1
      }
    }
    if (deltaX < -100) {
      if (position.value > -1 && isSwipeAllowed.value) {
        position.value -= 1
      }
    }
  }

  const resetPosition = () => {
    position.value = 0
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    position,
    resetPosition,
  }
}
