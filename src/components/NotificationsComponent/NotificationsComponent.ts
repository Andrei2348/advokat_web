import { defineComponent } from 'vue'
import { useUXUIStore } from '@/store/uxui'

export default defineComponent({
  name: 'NotificationsComponent',
  props: {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    isInMain: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const uxuiStore = useUXUIStore()
    return { uxuiStore }
  },
})
