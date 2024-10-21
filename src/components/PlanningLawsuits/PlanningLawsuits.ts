import { defineComponent, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import TabsNav from '@/components/TabsNav/TabsNav.vue'
import TaskEventItem from '@/components/TaskEventItem/TaskEventItem.vue'
import { useLawsuitStore } from '@/store/lawsuite'
import { useUXUIStore } from '@/store/uxui'
import { useEventsStore } from '@/store/events'
import { useTasksStore } from '@/store/tasks'
import { lawsuitEventsHeader } from '@/config/lawsuitEvents'
import { modalsContent } from '@/config/deleteModalsConfig'
import {
  TaskEvent,
  LawsuitTaskEventTableTab,
  SelectedPlan,
} from '@/types/lawsuit'

export default defineComponent({
  name: 'PlanningLawsuits',
  components: {
    TabsNav,
    TaskEventItem,
  },
  setup() {
    const lawsuitStore = useLawsuitStore()
    const eventsStore = useEventsStore()
    const tasksStore = useTasksStore()
    const uxuiStore = useUXUIStore()
    const router = useRouter()
    const selectedTab = ref<LawsuitTaskEventTableTab>('Запланировано')
    const tabs: LawsuitTaskEventTableTab[] = ['Запланировано', 'Выполнено']

    const changeTab = (tabName: string) => {
      selectedTab.value = tabName as LawsuitTaskEventTableTab
    }

    const cleanedEventsAndTasks = (items: TaskEvent[]) => {
      return items.map((item) => (item.event ? item.event : item.task))
    }

    const getItems = computed(() => {
      const items = lawsuitStore.lawsuitEvents
      if (items) {
        const plannedItems = cleanedEventsAndTasks(items).filter(
          (item) => item.status === 'planned',
        )
        const finishedItems = cleanedEventsAndTasks(items).filter(
          (item) => item.status === 'finished',
        )
        return { plannedItems, finishedItems }
      }

      return null
    })

    watch(
      [
        () => eventsStore.changeDataResponse,
        () => tasksStore.changeStatusResponse,
      ],
      () => {
        if (router.currentRoute.value.name === 'lawsuit-details') {
          lawsuitStore.getLawsuitEvents({
            id: Number(router.currentRoute.value.params.id),
          })
        }
      },
    )

    const deleteEventTask = (
      eventId: number | null,
      type: SelectedPlan,
    ): void => {
      uxuiStore.setTypeOfSelectedPlan(type)
      if (eventId !== null && typeof eventId === 'number') {
        uxuiStore.setModalName('ConfirmationDelete')
        uxuiStore.setModalContent(modalsContent['taskEvent'], eventId)
      }
    }

    return {
      TabsNav,
      tabs,
      selectedTab,
      lawsuitEventsHeader,
      changeTab,
      TaskEventItem,
      lawsuitStore,
      getItems,
      deleteEventTask,
    }
  },
})
