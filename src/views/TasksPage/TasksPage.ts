import { defineComponent, ref, computed } from 'vue'
import { onBeforeMount } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { useUXUIStore } from '@/store/uxui'
import TabsNav from '@/components/TabsNav/TabsNav.vue'
import TaskEventItem from '@/components/TaskEventItem/TaskEventItem.vue'
import { useScrolling } from '@/composables/useScrolling'
import { tasksTableHeader } from '@/config/tasks'
import { TaskTableTabs } from '@/types/tasks'

export default defineComponent({
  name: 'TasksPage',
  components: { TabsNav, TaskEventItem },
  setup() {
    const tasksStore = useTasksStore()
    const uxuiStore = useUXUIStore()

    const selectedTab = ref<TaskTableTabs>('Мой день')
    const tabs: TaskTableTabs[] = ['Мой день', 'Запланировано', 'Архив']
    const tasksList = ref<HTMLElement | null>(null)

    const tabsMeaning = {
      'Мой день': 'myDay',
      Запланировано: 'planned',
      Архив: 'finished',
    }

    const taskItems = computed(() => {
      const key = tabsMeaning[selectedTab.value]
      if (key === 'myDay') {
        return tasksStore.allTasks?.data.filter((task) => task.toDoDate)
      }
      return tasksStore.allTasks?.data.filter((task) => task.status === key)
    })

    const onTabClick = (tab: string) => {
      selectedTab.value = tab as TaskTableTabs
    }

    const deleteTask = (id: number) => {
      tasksStore.openRemoveModal(id)
    }

    onBeforeMount(async () => {
      await tasksStore.getTasks({ page: 1 })
      useScrolling(tasksList.value, tasksStore.loadMoreTasks)
    })
    return {
      tasksStore,
      tasksTableHeader,
      uxuiStore,
      selectedTab,
      tabs,
      tasksList,
      taskItems,
      onTabClick,
      deleteTask,
    }
  },
})
