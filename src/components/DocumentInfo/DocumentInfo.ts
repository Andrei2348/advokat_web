import { defineComponent } from 'vue'
import { getFormatDate } from '@/helpers/dateFormatter'

export default defineComponent({
  name: 'DocumentInfo',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    signingDate: {
      type: String,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
    endMonths: {
      type: Number,
      required: true,
    },
    endDays: {
      type: Number,
      required: true,
    },
  },

  setup() {
    return {
      getFormatDate,
    }
  },
})
