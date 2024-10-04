import { defineComponent } from 'vue'

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
  },
  setup() {
    return {}
  },
})
