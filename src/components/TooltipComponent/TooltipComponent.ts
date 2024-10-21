import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TooltipComponent',
  props: {
    text: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
