import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { ModalContent, ModalNameContent } from '@/types/modals'
import { SelectedPlan } from '@/types/lawsuit'
import { useLockBodyScroll } from '@/composables/useLockBodyScroll'

export const useUXUIStore = defineStore('uxui', () => {
  const asideCollapsed = ref(true)
  const isAdmin = ref(false)
  const notesPanelVisible = ref(false)
  const typeOfSelectedPlan = ref<SelectedPlan>('task')
  const currentPage = ref<string>('')
  const swipePermission = ref(true)
  const { enableBodyScroll, disableBodyScroll } = useLockBodyScroll()

  const modalName = ref<ModalNameContent>({
    modalName: '',
    index: undefined as number | undefined,
  })

  const modalContent = ref<ModalContent | null>(null)
  const getIsAdmin = computed(() => isAdmin.value)

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

  watch(
    () => [notesPanelVisible.value, modalName.value.modalName],
    ([notesVisible, modalName]) => {
      notesVisible || modalName !== ''
        ? disableBodyScroll()
        : enableBodyScroll()
    },
  )

  return {
    asideCollapsed,
    isAdmin,
    notesPanelVisible,
    getIsAdmin,
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
    setSwipePermission,
    swipePermission,
  }
})
