import { defineComponent, PropType, ref } from 'vue'
import TableHead from '@/components/TableHead/TableHead.vue'
import { TableItems } from '@/types/lawsuit'
import { LawsuitTaskEventTableTab } from '@/types/lawsuit'
import { TaskTableTabs } from '@/types/tasks'

export default defineComponent({
  name: 'TabsNav',
  components: {
    TableHead,
  },
  props: {
    names: {
      type: Array as PropType<LawsuitTaskEventTableTab[] | TaskTableTabs[]>,
      required: true,
    },
    selectedTab: {
      type: String,
      required: false,
    },
    headerItems: {
      type: Array as PropType<TableItems[]>,
      required: true,
    },
  },
  emits: {
    changeTab: (tabName: LawsuitTaskEventTableTab | TaskTableTabs) =>
      typeof tabName === 'string',
  },
  setup(_, { emit }) {
    const list = ref<HTMLDivElement | null>(null)

    const clickOnTab = (tabName: LawsuitTaskEventTableTab | TaskTableTabs) => {
      emit('changeTab', tabName)
    }

    return {
      clickOnTab,
      list,
    }
  },
})
