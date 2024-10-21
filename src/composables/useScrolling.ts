import { onMounted, onUnmounted } from 'vue'

export const useScrolling = (
  scrollingContainerRef: HTMLElement | null,
  callback: (params?: any) => Promise<void>,
) => {
  const handleScroll = async () => {
    if (
      scrollingContainerRef &&
      scrollingContainerRef.getBoundingClientRect().bottom < window.innerHeight
    ) {
      await callback()
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
