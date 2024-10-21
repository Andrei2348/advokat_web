import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { ModalContent, ModalNameContent } from '@/types/modals'
import { SelectedPlan } from '@/types/lawsuit'

export const useUXUIStore = defineStore('uxui', () => {
  const asideCollapsed = ref(true)
  const isAdmin = ref(false)
  const notesPanelVisible = ref(false)
  const typeOfSelectedPlan = ref<SelectedPlan>('task')
  const currentPage = ref<string>('')
  const swipePermission = ref(true)
  const isNotificationOpen = ref(false)
  const notification = reactive<{
    text: string
    status: 'done' | 'error' | ''
    size: 'large'
  }>({
    text: '',
    status: 'done',
    size: 'large',
  })

  const modalName = ref<ModalNameContent>({
    modalName: '',
    index: undefined as number | undefined,
  })

  const modalContent = ref<ModalContent | null>(null)
  const getIsAdmin = computed(() => isAdmin.value)

  const openNotification = (status: 'done' | 'error', text: string) => {
    notification.status = status
    notification.text = text
    isNotificationOpen.value = true

    setTimeout(closeNotification, 3000)
  }

  const closeNotification = () => {
    isNotificationOpen.value = false
    notification.status = ''
    notification.text = ''
  }

  const switchAside = () => {
    asideCollapsed.value = !asideCollapsed.value
  }

  const setSwipePermission = (payload: boolean) => {
    swipePermission.value = payload
  }

  const removeCollapse = () => {
    asideCollapsed.value = false
  }

  const setAdmin = (payload: boolean) => {
    isAdmin.value = payload
  }

  const setCurrentPage = (payload: string) => {
    currentPage.value = payload
  }

  const setModalName = (name: string, index?: number) => {
    modalName.value.modalName = name
    if (index) {
      modalName.value.index = index
    }
  }

  const setTypeOfSelectedPlan = (payload: SelectedPlan) => {
    typeOfSelectedPlan.value = payload
  }

  const switchNotesPanel = () => {
    notesPanelVisible.value = !notesPanelVisible.value
  }

  const setModalContent = (payload: ModalContent | null, id: number | null) => {
    modalContent.value = payload ? { ...payload, id } : null
  }

  return {
    asideCollapsed,
    isAdmin,
    notesPanelVisible,
    getIsAdmin,
    isNotificationOpen,
    notification,
    openNotification,
    closeNotification,
    switchAside,
    setAdmin,
    switchNotesPanel,
    modalName,
    setModalName,
    modalContent,
    setModalContent,
    typeOfSelectedPlan,
    setTypeOfSelectedPlan,
    currentPage,
    setCurrentPage,
    removeCollapse,
    swipePermission,
    setSwipePermission,
  }
})
