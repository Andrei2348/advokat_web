import { defineComponent, ref } from 'vue'
import TabsNav from '@/components/TabsNav/TabsNav.vue'
import LawsuitEvent from '@/components/LawsuitEvent/LawsuitEvent.vue'
import { useLawsuitStore } from '@/store/lawsuite'
import { TaskEvent } from '@/types/lawsuit'
import { useMainStore } from '@/store/main'

export default defineComponent({
  name: 'PlanningLawsuits',
  components: {
    TabsNav,
    LawsuitEvent,
  },
  setup() {
    const lawsuitStore = useLawsuitStore()
    const mainStore = useMainStore()
    const selectedTab = ref<string>('Запланировано')
    const tabs = [{ name: 'Запланировано' }, { name: 'Выполнено' }]

    const changeTab = (tabName: string) => {
      selectedTab.value = tabName
    }

    const getPlannedItems = (items: TaskEvent[] | null) => {
      if (items) {
        return items.filter(
          (item) =>
            item.task?.status === 'planned' || item.event?.status === 'planned',
        )
      }
      return []
    }

    const getFinishedItems = (items: TaskEvent[] | null) => {
      if (items) {
        return items.filter(
          (item) =>
            item.task?.status === 'finished' ||
            item.event?.status === 'finished',
        )
      }
      return []
    }

    return {
      TabsNav,
      tabs,
      selectedTab,
      changeTab,
      LawsuitEvent,
      lawsuitStore,
      getPlannedItems,
      getFinishedItems,
      mainStore,
    }
  },
})
