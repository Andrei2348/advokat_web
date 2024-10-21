import { defineComponent } from 'vue'
import { useTagsStore } from '@/store/tags'
import { tagsItems } from '@/config/tags'
import TagsForTasksItem from '@/components/TagsForTasksItem/TagsForTasksItem.vue'

export default defineComponent({
  name: 'TagsForTasks',
  components: {
    TagsForTasksItem,
  },
  setup() {
    const tagsStore = useTagsStore()

    return {
      tagsStore,
      tagsItems,
    }
  },
})
