import { defineComponent, PropType } from 'vue'
import { lawsuitEventsHeader } from '@/config/lawsuitEvents'
import { useMainStore } from '@/store/main'

export default defineComponent({
  name: 'TabsNav',
  props: {
    names: {
      type: Array as PropType<{ name: string }[]>,
      required: true,
    },
    selectedTab: {
      type: String,
      required: false,
    },
  },
  emits: {
    changeTab: (tabName: string) => typeof tabName === 'string',
  },
  setup(_, { emit }) {
    const mainStore = useMainStore()
    const clickOnTab = (tabName: string) => {
      emit('changeTab', tabName)
    }

    return {
      clickOnTab,
      lawsuitEventsHeader,
      mainStore,
    }
  },
})
