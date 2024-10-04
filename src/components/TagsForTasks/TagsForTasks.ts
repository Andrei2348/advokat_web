import { defineComponent } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { tagsItems } from '@/config/tags'
import TagsForTasksItem from '@/components/TagsForTasksItem/TagsForTasksItem.vue'

export default defineComponent({
  name: 'TagsForTasks',
  components: {
    TagsForTasksItem,
  },
  setup() {
    const tasksStore = useTasksStore()

    return {
      tasksStore,
      tagsItems,
    }
  },
})
