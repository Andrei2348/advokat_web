import { defineComponent, PropType } from 'vue'
import { TableItems } from '@/types/lawsuit'

export default defineComponent({
  name: 'TableHead',
  props: {
    items: {
      type: Array as PropType<TableItems[]>,
    },
  },

  setup() {
    return {}
  },
})
