import { defineComponent, PropType } from 'vue'
import { tableItems } from '@/types/lawsuit'

export default defineComponent({
  name: 'TableHead',
  props: {
    items: {
      type: Array as PropType<tableItems[]>,
    },
  },

  setup() {
    return {}
  },
})
