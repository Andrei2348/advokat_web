import { DefineComponent } from 'vue'

export const useScrolling = <D, N = undefined>(
  scrollingContainerRef: DefineComponent<D> | null,
  callback: (params?: any) => Promise<void>,
  params?: N,
) => {
  const list = scrollingContainerRef?.$refs.list
  const handler = async () => {
    if (
      list &&
      list.getBoundingClientRect().bottom <= window.innerHeight &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
      await callback(params)
    }
  }
  return handler
}
