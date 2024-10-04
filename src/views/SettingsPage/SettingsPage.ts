import { defineComponent, computed, onBeforeMount } from 'vue'
import EventsList from '@/components/EventsList/EventsList.vue'
import { useUXUIStore } from '@/store/uxui'
import { useEventsStore } from '@/store/events'
import { useLawsuitStore } from '@/store/lawsuite'
import { useTasksStore } from '@/store/tasks'
import CaseCategory from '@/components/CaseCategory/CaseCategory.vue'
import TagsForTasks from '@/components/TagsForTasks/TagsForTasks.vue'
import WorkingDay from '@/components/WorkingDay/WorkingDay.vue'
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    EventsList,
    CaseCategory,
    TagsForTasks,
    WorkingDay,
  },
  setup() {
    const uxuiStore = useUXUIStore()
    const eventsStore = useEventsStore()
    const lawsuitStore = useLawsuitStore()
    const tasksStore = useTasksStore()
    const userStore = useUserStore()

    const saveDataHandler = async () => {
      await eventsStore.processArrayObjects()
      await lawsuitStore.processArrayObjects()
      await tasksStore.processArrayObjects()
      await userStore.changeWorkShedule()
    }

    const isButtonEnabled = computed(() => {
      const hasLawsuitCategories =
        Array.isArray(lawsuitStore.arrayOfLawsuitCategories) &&
        lawsuitStore.arrayOfLawsuitCategories.length > 0
      const hasEventTypes =
        Array.isArray(eventsStore.arrayOfEventsTypes) &&
        eventsStore.arrayOfEventsTypes.length > 0
      const hasTags =
        Array.isArray(tasksStore.arrayOfTags) &&
        tasksStore.arrayOfTags.length > 0
      const isValidated = userStore.selectedItemValidate === true

      return hasLawsuitCategories || hasEventTypes || hasTags || isValidated
    })

    const setRequests = async () => {
      await eventsStore.getEventsTypes()
      await lawsuitStore.getLawsuitCategoriesList()
      await tasksStore.getTagsForTasksList()
      await userStore.getUserDataInfo()
    }

    onBeforeMount(async () => {
      await setRequests()
    })

    return {
      EventsList,
      uxuiStore,
      saveDataHandler,
      isButtonEnabled,
    }
  },
})
